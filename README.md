# Before you begin

## Prequesites

1. Required:

- Docker
- kubernetes
- skaffold

2. Checkout the project

   ```
   $ https://github.com/GurungPinkel/node-app.git
   ```

3. Run skaffold to build and deploy to local kubernetes:

   - add `pinkel.dev` to your host file as follows:
     - 127.0.0.1 pinkel.dev
   - Run the following commands

     ```
       $ cd node-app/skaffold

       $ kubectl create secret generic environment --from-env-file=.env.local

         $ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-0.32.0/deploy/static/provider/cloud/deploy.yaml

       $ skaffold dev

     ```

### For further details documentation for each module resides in its own folder.

to connect to mysql from local, use port forwarding.
e.g:
kubectl port-forward <mysql-deployment> 3305:3306
