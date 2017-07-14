/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

function buildUrl(url, data) {
    var args = [];
    for (var key in data) {
        args.push(key + '=' + encodeURIComponent(data[key]));
    }

    if (args.length > 0) {
        return url + '?' + args.join('&');
    }
    else {
        return url;
    }
}

function request(method, success, failure, args) {
    var url = args[0];
    var data = args[1];
    var headers = args[2];
    var request = new XMLHttpRequest();

    if (method === 'GET') {
        url = buildUrl(url, data);
    }

    request.open(method, url);

    for (var key in headers) {
        request.setRequestHeader(key, headers[key]);
    }

    request.onreadystatechange = function () {
        if (!request || request.readyState !== 4) {
            return;
        }

        success({
            data: request.response
        });
    }

    request.send(JSON.stringify(data));

}


var HTTP = {
    post: function(success, failure, args) {
        request('POST', success, failure, args);
    },
    get: function(success, failure, args) {
        request('GET', success, failure, args);
    }
};

module.exports = HTTP;

require("cordova/exec/proxy").add("CordovaHttpPlugin", module.exports);
