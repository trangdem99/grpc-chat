# GRPC Chat App

This is a simple chat application built using GRPC, NodeJS, and ReactJS.

## Detail:

```
  Author: trangdem99
  Last update: 08/02/2024
```

## Features:

- Real-time messaging using GRPC bidirectional streaming
- User authentication and authorization
- Multiple chat rooms
- User presence status
- Message history

## Technologies Used:

- NodeJS
- ReactJS
- GRPC
- MongoDB

## Prerequisites:
- Docker

## Installation:

1. Clone the repository:
    ```bash
        git clone https://github.com/trangdem99/grpc-chat.git
    ```
2. Run docker:
    ```bash
        docker-compose up
    ```

## Configuration:

- The server runs on port 50051 by default. You can change this port by modifying:
-- PORT constant in src/index.js.
-- port_value in last line in docker/envoy.yaml.
- The proxy runs on port 8080 by default. You can change this port by modifying:
-- port_value in line 10 in docker/envoy.yaml.
-- 8080 in all files in src/views/src/pages.

## Code Convention:

- Use camelCase for function, and method names.
- Use PascalCase for class and component names.
- Use snake_case for variables.
- Use lower-kebab for name of folders / files.
- Use UPPER_SNAKE_CASE for constants, environment variables.

## Indentation:
- Use 2 spaces for indentation.


## Add your own code:

- You can add your own code like you want by following few steps below:
-- Add your protos in src/protos.
-- Type this ```npm run proto:gen``` on terminal of docker (nodejs) to generate proto files for client side.
-- Add your controllers in src/controllers.
-- Add service to server in src/index.js by follow previous code in it.
-- Add pages layout in src/views/src/pages (Remember to add route in src/views/src/App.js).
- That's it. Your own code is ready.

## Usage:

- Just type ``` docker-compose up ``` on terminal of root folder of project folder.
- Open http://localhost:3000/ in multiple browser windows. (Please noted that 1 browser only run 2 client at 1 time (normal and private mode) since I'm using jwt and storage at localStorage).
- Add new conversation at bottom right of first card (if you didn't create before).
- Click on the conversation that you want on first card, second first will show.
- You can see there are 2 button on the top right for add and remove account in that conversation.
-- If you click add, add modal will show. You will enter the username that you want to add. If it existed, it will show below and you just click add button next to the username.
-- If you click remove, remove modal will show. You will choose the account that you want to remove and just click remove button next to the username.
- You can see there is a input form and send button. You will know what it using for :) 
- That's it. Enjoy!!!

## License:
This project is licensed under the ISC License.

## Note:

```
  Any problem please contact me through:
    Skype: @trangdem99
    FB: Huỳnh Thành Nguyên
    Email: contact.trangdem99@gmail.com
```

## Version log:

```
  Version: v1.0.0
  Date: 08/02/2024
  Log: First version init
```