/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
  useEffect,
  useState,
} from "react";
import {
  useNavigate
} from 'react-router-dom';
import Swal from 'sweetalert2'
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import {
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

import {
  SearchAccount,
  AddOrRemoveAccount,
  Empty,
  Message,
} from '../protos/models_pb'
import {
  AccountsClient
} from '../protos/accounts_grpc_web_pb'
import {
  ConversationsClient
} from '../protos/conversations_grpc_web_pb'
import { dateFormat } from "../utils";

const account_client = new AccountsClient('http://localhost:8080', null, null);
const conversation_client = new ConversationsClient('http://localhost:8080', null, null);

export const Home = () => {
  const history = useNavigate();
  const [account, setAccount] = useState(null)
  const [conversations, setConversations] = useState([])
  const [active, setActive] = useState(null)
  const [msg, setMsg] = useState({
    msg: '',
    type: '',
  })
  const [modal, setModal] = useState(null)
  const [username, setUsername] = useState("")
  const [search_results, setSearch_results] = useState([])

  const [message, setMessage] = useState("")

  const send = () => {
    if (!message) {
      setMsg({ msg: "Message cannot be empty", type: 'danger' })
      return
    }

    if (!active || !active._id) {
      setMsg({ msg: "No active conversation", type: 'danger' })
      return
    }

    const sent_message = new Message()
    sent_message.setId(active._id)
    sent_message.setMessage(message)

    conversation_client.send(sent_message, {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }, (err, response) => {
      if (err) {
        setMsg({ msg: err.message, type: 'danger' })
      } else {
        console.log(response);
        if (response.array[0]) {
          setMessage("")
        }
        else {
          setMsg({ msg: response.array[1], type: 'danger' })
        }
      }
    })
  }
  
  useEffect(() => {
    if (username) {
      setTimeout(() => {
        const search_account = new SearchAccount()
        search_account.setUsername(username)

        account_client.searchAccount(search_account, {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }, (err, response) => {
          if (err) {
            setMsg({ msg: err.message, type: 'danger' })
          } else {
            console.log(response);
            if (response.array[0]) {
              setSearch_results(JSON.parse(response.array[2]).accounts)
            }
            else {
              setMsg({ msg: response.array[1], type: 'danger' })
            }
          }
        })
      }, 1000)
    }
  }, [username])

  const addAccount = (select_account) => {
    const add_or_remove_account = new AddOrRemoveAccount()
    add_or_remove_account.setId(active._id)
    add_or_remove_account.setAccount(select_account._id)

    conversation_client.addAccount(add_or_remove_account, {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }, (err, response) => {
      if (err) {
        setMsg({ msg: err.message, type: 'danger' })
      } else {
        console.log(response);
        if (response.array[0]) {
          setModal(null)
          setSearch_results([])
          setUsername("")
          setMsg({ msg: response.array[1], type: 'success' })
        }
        else {
          setMsg({ msg: response.array[1], type: 'danger' })
        }
      }
    })
  }

  const removeAccount = (select_account) => {
    const add_or_remove_account = new AddOrRemoveAccount()
    add_or_remove_account.setId(active._id)
    add_or_remove_account.setAccount(select_account._id)

    conversation_client.removeAccount(add_or_remove_account, {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }, (err, response) => {
      if (err) {
        setMsg({ msg: err.message, type: 'danger' })
      } else {
        console.log(response);
        if (response.array[0]) {
          setModal(null)
          setSearch_results([])
          setUsername("")
          setMsg({ msg: response.array[1], type:'success' })
        }
        else {
          setMsg({ msg: response.array[1], type: 'danger' })
        }
      }
    })
  }

  const newConversation = () => {
    conversation_client.newConversation(new Empty(), {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }, (err, response) => {
      if (err) {
        setMsg({ msg: err.message, type: 'danger' })
      } else {
        console.log(response);
        if (response.array[0]) {
          setMsg({ msg: response.array[1], type: 'success' })
        }
        else {
          setMsg({ msg: response.array[1], type: 'danger' })
        }
      }
    })
  }

  useEffect(() => {
    const access_token = localStorage.getItem('access_token')

    if (!access_token) {
      history('/sign-in')
    }
    else {
      if (document.documentElement.getAttribute("data-toggled") !== "icon-overlay-close") {
        document.documentElement.setAttribute("data-toggled", "icon-overlay-close")
      }

      account_client.getProfile(new Empty(), {
        'Authorization': `Bearer ${access_token}`
      }, (err, response) => {
        if (err) {
          setMsg({ msg: err.message, type: 'danger' })
        } else {
          if (response.array[0]) {
            setAccount(JSON.parse(response.array[2]).account)
          }
          else {
            setMsg({ msg: response.array[1], type: 'danger' })
          }
        }
      })

      const stream = conversation_client.stream(new Empty(), {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }, (err, response) => {
        if (err) {
          setMsg({ msg: err.message, type: 'danger' })
        }
      })


      stream.on('data', (response) => {
        const { _id, type, updated_data } = JSON.parse(response.array[0]);

        if (!_id) {
          return;
        }

        // Check if the received event is for a new conversation
        if (type === "new-conversation") {
          setConversations(prevConversations => [...prevConversations, updated_data]);
        }

        // Check if the received event is for updating an existing conversation
        if (type === "update-conversation") {
          setConversations(prevConversations => {
            // If the received conversation is not in the previous conversations, add it to the previous conversations 
            if (!prevConversations.find(conversation => conversation._id === updated_data._id)) {
              return [...prevConversations, updated_data];
            }

            // Map through the previous conversations and update the one with the matching _id
            return prevConversations.map(conversation => {
              if (conversation._id === updated_data._id) {
                return updated_data; // Return the updated conversation
              }

              return conversation; // Return other conversations unchanged
            });
          });

          setActive(prevActive => {
            // If the active conversation is the one being updated, update the active conversation
            if (prevActive !== null && prevActive._id === updated_data._id) {
              return updated_data;
            }

            return prevActive; // Return the previous active conversation unchanged
          });
        }
      });
    }
  }, [history])

  useEffect(() => {
    if (!account) {
      return
    }
    else {
      conversation_client.list(new Empty(), {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }, (err, response) => {
        if (err) {
          setMsg({ msg: err.message, type: 'danger' })
        } else {
          if (response.array[0]) {
            setConversations(JSON.parse(response.array[2]).conversations)
          }
          else {
            setMsg({ msg: response.array[1], type: 'danger' })
          }
        }
      })
    }
  }, [account])

  useEffect(() => {
    if (msg.msg) {
      Swal.fire({
        icon: msg.type === "danger" ? "warning" : "success",
        title: msg.type === "danger" ? "Warning" : "Success",
        text: msg.msg,
      });
    }
  }, [msg])

  return (
    <>
      <div className="page">
        <div className="container-fluid">
          <div className="main-chart-wrapper gap-4 mb-5 d-xl-flex">
            <div className="chat-info border">
              <button className="btn btn-secondary btn-icon rounded-circle chat-add-icon" onClick={newConversation}>
                <i className="ri-add-line"></i>
              </button>
              <div className="d-flex align-items-center justify-content-between w-100 p-3 border-bottom">
                <h6 className="fw-semibold mb-0">Messages</h6>
              </div>
              <SimpleBar autoHide={true}>
                <ul className="list-unstyled mb-0 mt-2 chat-users-tab">
                  {
                    conversations.map((conversation) => {
                      return (
                        <li className="checkforactive" key={`chat-sidebar-${conversation._id}`}>
                          <a href="#!" onClick={() => {
                            if (!active || active._id !== conversation._id) {
                              setActive(conversation)
                            }
                            else {
                              setActive(null)
                            }
                          }}>
                            <div className="d-flex align-items-top">
                              <div className="me-1 lh-1">
                                <span className="avatar avatar-md me-2 avatar-rounded">
                                  <img src="/images/faces.jpg" alt="img" />
                                </span>
                              </div>
                              <div className="flex-fill">
                                <p className="mb-0 fw-semibold">
                                  {
                                    (conversation.accounts || []).slice(0, 2).map((conversation_account) => {
                                      if (conversation_account._id !== account._id) {
                                        return conversation_account.username
                                      }

                                      return "Me"
                                    }).join(", ")
                                  }
                                  {
                                    conversation.accounts.length > 2 ? ", others" : ""
                                  }
                                  {
                                    conversation.messages.length > 0 ? (
                                      <>
                                        <span className="float-end text-muted fw-normal fs-11">{dateFormat(conversation.messages[conversation.messages.length - 1].created_at)}</span>
                                      </>
                                    ) : ""
                                  }
                                </p>
                                {
                                  conversation.messages.length > 0 ? (
                                    <>
                                      <p className="fs-12 mb-0">
                                        <span className="chat-msg text-truncate"> {conversation.messages[conversation.messages.length - 1].account._id === account._id ? "Me" : conversation.messages[conversation.messages.length - 1].account.username}: {conversation.messages[conversation.messages.length - 1].message}</span>
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <p className="fs-12 mb-0">
                                        <span className="chat-msg text-truncate">No messages yet</span>
                                      </p>
                                    </>
                                  )
                                }
                              </div>
                            </div>
                          </a>
                        </li>
                      )
                    })
                  }
                </ul>
              </SimpleBar>
            </div>
            {
              active !== null ? (
                <div className="main-chat-area border">
                  <div className="d-flex align-items-center p-3 border-bottom">
                    <div className="me-2 lh-1">
                      <span className="avatar avatar-lg me-2 avatar-rounded chatstatusperson">
                        <img src="/images/faces.jpg" alt="img" />
                      </span>
                    </div>
                    <div className="flex-fill">
                      <p className="chatnameperson responsive-userinfo-open">
                        {console.log(active)}

                        {(active.accounts || []).slice(0, 2).map((conversation_account) => {
                          

                          if (conversation_account._id !== account._id) {
                            return conversation_account.username
                          }

                          return "Me"
                        }).join(", ")}
                        {
                          active.accounts.length > 2 ? ", others" : ""
                        }
                      </p>
                    </div>
                    <div className="d-flex">
                      <button type="button" className="btn btn-icon btn-light ms-2 d-none d-sm-block" onClick={() => { setModal("add") }}>
                        <i className="bx bx-plus"></i>
                      </button>
                      <button type="button" className="btn btn-icon btn-light ms-2 d-none d-sm-block" onClick={() => { setModal("minus") }}>
                        <i className="bx bx-minus"></i>
                      </button>
                    </div>
                  </div>
                  <SimpleBar forceVisible="y" autoHide={true} className="chat-content">
                    <ul className="list-unstyled">
                      {
                        (active.messages || []).map((message) => {
                          if (message.account._id !== account._id) {
                            return (
                              <li className="chat-item-start" key={`message-${message._id}`} >
                                <div className="chat-list-inner">
                                  <div className="chat-user-profile">
                                    <span className="avatar avatar-md avatar-rounded chatstatusperson">
                                      <img src="/images/faces.jpg" alt="img" />
                                    </span>
                                  </div>
                                  <div className="ms-3">
                                    <span className="chatting-user-info d-inline-flex align-items-center">
                                      <span className="chatnameperson">{message.account.username || "Unknown"}</span> <span className="msg-sent-time">{dateFormat(message.created_at)}</span>
                                    </span>
                                    <div className="main-chat-msg">
                                      <div>
                                        <p className="mb-0">{message.message}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            )
                          }

                          return (
                            <li className="chat-item-end" key={`message-${message._id}`} >
                              <div className="chat-list-inner">
                                <div className="me-3">
                                  <span className="chatting-user-info d-inline-flex align-items-center">
                                    <span className="msg-sent-time">
                                      <span className="chat-read-mark align-middle">
                                        <i className="ri-check-double-line"></i>
                                      </span>{dateFormat(message.created_at)}
                                    </span> You
                                  </span>
                                  <div className="main-chat-msg">
                                    <div>
                                      <p className="mb-0">{message.message}</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="chat-user-profile">
                                  <span className="avatar avatar-md online avatar-rounded">
                                    <img src="/images/faces.jpg" alt="img" />
                                  </span>
                                </div>
                              </div>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </SimpleBar>
                  <div className="chat-footer">
                    <input className="form-control" placeholder="Type your message here..." type="text" onChange={(e) => { setMessage(e.target.value) }} value={message} />
                    <button className="btn btn-primary d-inline-flex" onClick={send}>
                      <i className="ri-send-plane-2-line me-2"></i>Send
                    </button>
                  </div>
                </div>
              ) : null
            }
          </div>
        </div>
      </div>
      <Modal isOpen={modal !== null} toggle={() => { setModal(null) }} centered={true} scrollable={true}>
        <ModalHeader toggle={() => { setModal(null) }}>
          { modal==="add"? "Add Account" : "Remove Account" }
        </ModalHeader>
        <ModalBody>
          {
            modal==="add"? (
              <>
                <p>Enter the username of the account you want to add to this conversation</p>
                <input type="text" className="form-control" value={username} onChange={(e) => {
                  setUsername(e.target.value)
                }}/>

                <ul className="list-unstyled mb-0 mt-2 chat-users-tab">
                  {
                    search_results.map((search_result) => {
                      return (
                        <li key={`search-result-${search_result._id}`}>
                          <div className="d-flex align-items-top">
                            <div className="me-1 lh-1">
                              <span className="avatar avatar-md me-2 avatar-rounded">
                                <img src="/images/faces.jpg" alt="img" />
                              </span>
                            </div>
                            <div className="flex-fill">
                              <p className="mb-0 fw-semibold">{search_result.username}</p>
                            </div>
                            <div>
                              <button type="button" className="btn btn-primary" onClick={() => { addAccount(search_result) }}>Add</button>
                            </div>
                          </div>
                        </li>
                      )
                    })
                  }
                </ul>
              </>
            ) : (
              <>
                <p>Are you sure you want to remove this account from this conversation?</p>
                <ul className="list-unstyled mb-0 mt-2 chat-users-tab">
                  {
                    (active?.accounts || []).map((conversation_account) => {
                      if (conversation_account._id !== account._id) {
                        return (
                          <li key={`conversation-account-${conversation_account._id}`}>
                            <div className="d-flex align-items-top">
                              <div className="me-1 lh-1">
                                <span className="avatar avatar-md me-2 avatar-rounded">
                                  <img src="/images/faces.jpg" alt="img" />
                                </span>
                              </div>
                              <div className="flex-fill">
                                <p className="mb-0 fw-semibold">{conversation_account.username}</p>
                              </div>
                              <div>
                                <button type="button" className="btn btn-danger" onClick={() => { removeAccount(conversation_account) }}>Remove</button>
                              </div>
                            </div>
                          </li>
                        )
                      }

                      return null
                    })
                  }
                </ul>
              </>
            )
          }
        </ModalBody>
      </Modal>
    </>
  );
}