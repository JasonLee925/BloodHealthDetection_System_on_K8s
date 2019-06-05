# BloodHealthDetection_System_on_K8s
M.S. Course - Design of IoT Interactive Product: Final Program: Blood Health Detection (BHD) System on Kubenetes

---

#Blood Health Detection (BHD) System for Instance
>[DockerHub](https://cloud.docker.com/repository/docker/jason83925/bhd-app/general)

---
##**How to use?**
###Post

 - 血氧
`curl -X POST <ip-address>:30678/pressure -d "sys=256&dia=1"`

 - 血糖
`curl -X POST <ip-address>:30678/glucose -d value=10`

 - 血壓
`curl -X POST <ip-address>:30678/oxygen -d value=10`

###GET

 - Site (Current)
`curl -X GET<ip-address>:30678/`

 - Site (History)
`curl -X GET<ip-address>:30678/db`

---
##Result
***Current***
![image.png](https://trello-attachments.s3.amazonaws.com/5baf11e608544f6f7a51a7c3/5cf763d5a3b82b0ef535f444/9d10f2868c5026ddc0e079f36e1d240d/image.png) 

***History***
![image.png](https://trello-attachments.s3.amazonaws.com/5baf11e608544f6f7a51a7c3/5cf763d5a3b82b0ef535f444/a5258bf962af3132448f683f0ac32090/image.png) 

***Database***

 - Oxygen
![Oxygen.png](https://trello-attachments.s3.amazonaws.com/5baf11e608544f6f7a51a7c3/5cf763d5a3b82b0ef535f444/9a713fde235c0a33e9b9ceac2a47883c/image.png) 

 - Glucose
![Glucose.png](https://trello-attachments.s3.amazonaws.com/5baf11e608544f6f7a51a7c3/5cf763d5a3b82b0ef535f444/31ca20c2c3833b52bc8a35ed34c6d920/image.png) 

 - Pressure
![Pressure.png](https://trello-attachments.s3.amazonaws.com/5baf11e608544f6f7a51a7c3/5cf763d5a3b82b0ef535f444/88c6fbb7509a3dc20aef8be575c16961/image.png) 
---

##**YAML File**
Here is all components is k8s cluster.
![image.png](https://trello-attachments.s3.amazonaws.com/5baf11e608544f6f7a51a7c3/5cf763d5a3b82b0ef535f444/20021f9d749669d62cb4cd28a449809a/image.png) 
*Ignore curl & nfc

 - **mongodb.yaml**
Deployment of Mongo DB.
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongodb
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      containers:
      - name: mongodb-k8s
        image: mongo
        ports:
        - containerPort: 27017
```

 - **mongodb-svc.yaml**
Service of Mongo DB.
```
apiVersion: v1
kind: Service
metadata:
  name: mongo-svc
spec:
  ports:
  - port: 27017
    nodePort: 30638
    protocol: TCP
#    targetPort: 27017
  selector:
    app: mongodb
  type: NodePort
```

 - **bhd-server.yaml**
Deployment of BHD Server (Node.js)
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: bhd-server
spec:
  replicas: 1
  selector:
    matchLabels:
      app: bhd-server
  template:
    metadata:
      labels:
        app: bhd-server
    spec:
      containers:
      - name: bhd-server-k8s
        image: jason83925/bhd-app:v0.3
        ports:
        - containerPort: 4000
      hostNetwork: true
```


 - **bhd-svc.yaml**
Service of BHD Server (Node.js)
```
apiVersion: v1
kind: Service
metadata:
  name: bhd-server-svc
spec:
  ports:
  - port: 4000
    protocol: TCP
    nodePort: 30678
  selector:
    app: bhd-server
  type: NodePort
```
