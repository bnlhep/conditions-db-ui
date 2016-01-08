FROM pnnlhep/osg-base
MAINTAINER Kevin Fox "Kevin.Fox@pnnl.gov"

ADD ./start.sh /etc/start.sh
RUN chmod +x /etc/start.sh
RUN mkdir -p /var/www/html
ADD conditionsdbUi /var/www/html/
RUN yum install -y httpd

CMD ["/etc/start.sh"]
