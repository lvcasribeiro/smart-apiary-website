## Smart Apiary Website

This repository aims to concentrate relevant information and codes on the development of the website for interfacing the intelligent monitoring application of an apiary.

Access the deployment in production [here](https://smart-apiary.netlify.app/).

##

### Basic information about the project

###### 1. Main page:

The main page seeks to provide a small introduction about the project, followed by real-time information collected by sensors connected to the ESP32 microcontroller board, with code developed and configured in the repository presented [here](https://github.com/lvcasribeiro/smart-apiary-esp32).

<br>

###### 2. Historical page:

The secondary page, in a similar way, presents a short introduction and then the information collected by the sensors over time, in graphical interfaces in a cartesian plane.

<br>

###### 3. Script changes needed:

As in the tree shown below, access the JavaScript file **conexao.js**.

```bash
.
└── codigos
    └── conexao.js
```

Change lines 1 to 9 with the appropriate connection information for your firebase cloud database.

```JavaScript
const firebaseConfig = {
    apiKey: "firebase_api",
    authDomain: "firebase_auth_domain",
    databaseURL: "firebase_url",
    projectId: "firebase_prj_id",
    storageBucket: "firebase_bucket",
    messagingSenderId: "firebase_sender_id",
    appId: "firebase_app_id"
};
```

<br>

###### 4. Desktop view:

![image](https://github.com/lvcasribeiro/darknet-train-and-test-files-generator/assets/96185134/d51ac60e-1f51-40fe-aa4e-840a736ca692)

![image](https://github.com/lvcasribeiro/darknet-train-and-test-files-generator/assets/96185134/c6bb5e0c-9a9e-40c8-a36c-e62918d30532)


<br>

###### 5. Mobile view:

![image](https://github.com/lvcasribeiro/darknet-train-and-test-files-generator/assets/96185134/db64009f-a971-47b9-a7eb-441fbfff1864)

![image](https://github.com/lvcasribeiro/darknet-train-and-test-files-generator/assets/96185134/1f90b805-f0be-4e27-842d-d422bded7a6d)

##

### Remider

The project is still under development, and there may be some bugs or inconsistencies to be corrected. If you have any questions or problems, please contact me via email: lucas.and.rib@gmail.com. Thank you for understanding.
