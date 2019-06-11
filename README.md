# BloodHealthDetection_System_on_K8s
M.S. Course - Design of IoT Interactive Product: Final Program: Blood Health Detection (BHD) System on Kubenetes

---

#Blood Health Detection (BHD) System for Instance
>[DockerHub](https://cloud.docker.com/repository/docker/jason83925/bhd-app/general)

---
## **How to use?**
### Post

 - 血氧
`curl -X POST 127.0.0.1:30678/oxygen -d "o2=256&hbeat=1"`

 - 血糖
`curl -X POST <ip-address>:30678/glucose -d value=10`

 - 血壓
`curl -X POST <ip-address>:30678/pressure -d "sys=256&dia=1"`

### GET

 - Site (Current)
`curl -X GET<ip-address>:30678/`

 - Site (History)
`curl -X GET<ip-address>:30678/db`

---
## Result
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

## **Kubenetes Imforamtion**
![image.png](https://trello-attachments.s3.amazonaws.com/5baf11e608544f6f7a51a7c3/5cf763d5a3b82b0ef535f444/20021f9d749669d62cb4cd28a449809a/image.png) 

* Ignore curl & nfc

