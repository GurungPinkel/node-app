kubectl delete secret environment
kubectl create secret generic environment --from-env-file=.env.local
skaffold dev