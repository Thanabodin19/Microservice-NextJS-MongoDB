# Microservice-NextJS-MongoDB
Microservice NextJS + MongoDB Kubernetes

### Create NextJS Project 📝
```bash
npx create-next-app@latest nextjs-app --typescript
cd nextjs-app
npm install mongoose bcryptjs
```

### Docker build Image 🐳
```bash 
docker build -t nextjs-app:0.0.1 .
```
### Load Image to KinD ♻️
```bash
kind load docker-image <image name>
```

### Deploy NextJS + MongoDB 🚀
```bash
kubectl apply  -f .
```

### Forward Port Service 🪢
```bash
kubectl port-forward svc/<name svc> <port>:<port>
```

### Create User MongoDB Database 📖
```
use users_db
db.createCollection("users")
```