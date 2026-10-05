THIS README FILE IS FULL GUIDENCE OF MY EKART PROJECT STEP BY STEP ..
#step1
---- create sever base through this process ....
1. First we create a Backend and frontend file 
2. install npm init in Backend folder.
3. create server.js file in Backend folder.
4. run comand in backend folder npm i express nodemon jsonwebtoken mongoose dotenv.
5. create file dot env(.env) in backend folder
6. Install npm i bcrypt for password encoding in backend folder


##Step 2 (connect databse)

1. create Database folder in Backend folder and then create a file db.js in Database folder.
2. go to the mongodb.com
3. create a new project name ekart
4. use mongodbcompass 
5. copy the url and paste in .env file
5. go to the network access section and add the ip address.

#STEPS 3 (Create Schema)

1. create "models" folder in Backend folder and create usermodels.js file in modules folder

#Steps 4 (business logics)

1. create a folder in a backend name as Controllers and create a file UserControllers.js in Controllers folders

Install postman for API testing

create workspaces name User
add request

# Steps 5 
create a folder in backend folder name routes and then I create a file under routes folder userRoutes.js in this file we create a router

create a folder in Backend emailVerify 
install npm i nodemailer for verify email

create a file under the Models folder that name is sessionModel.js

create a folder in backend name is middleware for creating a middle ware

working on frontend part
1. install npm create vite@latest in frontend folder
2. install tailwin css(npm install tailwindcss @tailwindcss/vite)
3. npm run dev in frontend folder
4. install shadcn ui (npx shadcn@latest init)
5. npx shadcn@latest add button
6. npm i react-router-dom
7. use card from shadcn ui
8. npx shadcn@latest add card
install input from shadch ui (npx shadcn@latest add input)
install label from shadch ui (npx shadcn@latest add label)
install npm i axios in frontend folder(Axios is a popular promise-based HTTP client for JavaScript that makes it easy to send HTTP requests (such as GET, POST, PUT, and DELETE) to APIs from both browsers and Node.js)
add sonner in frontend folder npx shadcn@latest add sonner
install npm i cors in backend
install in frontend folder npm i react-icons

install npm i redux persist (npm i redux-persist)
if you use redux we need to install redux from redux toolkit website (npm install @reduxjs/toolkit) and also install (npm install react-redux)
 install npx shadcn@latest add tabs

 # cloudinary setup.... (use gmail bookforcode)
 1.Go to the browser and search clodinary.com 
 2. we need three things Name 
 3. create a folder in Backend name utils
 4. use multer which help to handle file temporary on server 
 5. install multer npm i multer
 

 install datauri in backend folder(npm i datauri)

 install npx shadcn@latest add separator
npx shadcn@latest add breadcrumb
npm i react-medium-image-zoom(for product image zoom in and out over on mouse cursor)
npm install --save react-medium-image-zoom

npx shadcn@latest add textarea

npx shadcn@latest add select
npx shadcn@latest add dialog
npx shadcn@latest add alert-dialog
npx shadcn@latest add radio-group

# RAZORPAY Configuration....
 ...Backend-Part...(With the help of Medium website)
1. create models for orders
2. use razorpay website and create account
3. use api_key and secrete_key of razorpay
4. install razorpay (npm i razorpay)
5. after that need to config the razorpay
6. create two apis for create order and last
7. for verify payment
8. Go to the controller and create controller 
9. create route for orders


...Frontend-Part...
paste it into fronted index.html (<script src='https://checkout.razorpay.com/v1/checkout.js'</script>)

create .env file in frontend and add razorpay-key-id

create pages for order-success
create path in app.js
npm i recharts
