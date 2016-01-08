#!/bin/bash -e

: ${REST_SERVER:='http://belle2db.hep.pnnl.gov/b2s/rest/v1'}

sed -i 's@^server = .*@server = "'"${REST_SERVER}"'";@' /var/www/html/index.html

/usr/sbin/httpd -DFOREGROUND
