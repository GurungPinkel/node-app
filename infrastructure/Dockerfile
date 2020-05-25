# docker build -t pinkelgrg/node-python .
# docker push pinkelgrg/node-python

FROM centos:8.1.1911

RUN (curl -sL https://rpm.nodesource.com/setup_12.x | bash -) \
  && yum clean all -y \
  && yum update -y \
  && yum install -y nodejs \
  && yum install -y wget \
  && yum autoremove -y \
  && yum clean all -y \
  && npm install npm --global

RUN yum install -y python3 \
  && yum autoremove -y \
  && yum clean all -y 