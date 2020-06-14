import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    // check to see if this method was triggered from server or client.
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  }
  return axios.create({
    baseURL: "/",
  });
};
