const URL = 'http://mybookvilla.com/rest/V1/';

//customer 
const URL_LOGIN_CUSTOMER = URL + 'integration/customer/token';
const URL_CUSTOMER_DETAILS = URL + 'customers/me';

export const API = {
    login: (onResponse, data) => {
        console.log("data -", data);
        request(onResponse, data, 'POST', URL_LOGIN_CUSTOMER);
    },
    getCustomerDetails: (onResponse, data) => {
        console.log("data -", data);
        let headers = {
            Authorization : data.Authorization
        }
        request(onResponse, data, 'GET', URL_CUSTOMER_DETAILS, headers);
    },

};

export const buildHeader = (headerParams = {}) => {
    let header = {
        'cache-control': 'no-cache',
        'content-type': 'application/json; charset=utf-8'
    };
    Object.assign(header, headerParams);
    return header;
};

function getRequestData(data) {
    let formBody = [];
    let encodedKey;
    let encodedValue;
    for (let property in data) {
        encodedKey = encodeURIComponent(property);
        encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    return formBody.join("&");
}


async function request(onResponse, data, type, featureURL, secureRequest = buildHeader()) {
    console.log('Data to send', data);
    console.log('Header', secureRequest);
    console.log('URL', featureURL);

    let response = '';
    try {
        if (type === 'GET') {
            //TODO PARAMETER CHECK
            response = await fetch(featureURL, {
                method: type,
                headers: secureRequest
            });
            var responseJSON = await response.json();
        } else {
            console.log("POST");
            response = await fetch(featureURL, {
                method: type,
                headers: secureRequest,
                body: JSON.stringify(data)
            });
            var responseJSON = await response.json();
        }

        console.log('API Response', responseJSON);


        if (responseJSON) {
            console.log("success -", responseJSON);
            onResponse.success(responseJSON);
        } else {
            console.log("eror", responseJSON);
            onResponse.error(responseJSON);
        }
    } catch (error) {
        //error = "Error: In api catch";
        console.log("catch -", error);
        error = "Network Error, Please check your Network connection";
        onResponse.error(error);
        if (onResponse.complete) {
            onResponse.complete();
        }
    }
}
