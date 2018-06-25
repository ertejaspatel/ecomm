const URL = 'http://mybookvilla.com/rest/V1/';
const ADMIN_URL = 'http://mybookvilla.com/rest/default/V1/';

//customer 
const URL_LOGIN_CUSTOMER = URL + 'integration/customer/token';
const URL_CUSTOMER_DETAILS = URL + 'customers/me';
const URL_PRODUCT_LIST = URL + 'products?searchCriteria';
const URL_ADMIN_TOKEN = ADMIN_URL + 'integration/admin/token';

export const API = {
    login: (onResponse, data) => {
        request(onResponse, data, 'POST', URL_LOGIN_CUSTOMER);
    },
    getAdminToken : (onResponse, data) => {
        request(onResponse, data, 'POST', URL_ADMIN_TOKEN);
    },
    getCustomerDetails: (onResponse, data) => {
        let headers = {
            Authorization : data.Authorization
        }
        request(onResponse, data, 'GET', URL_CUSTOMER_DETAILS, headers);
    },
    getProductList: (onResponse, data) => {
        let headers = {
            Authorization : data.Authorization
        }
        request(onResponse, data, 'GET', URL_PRODUCT_LIST, headers);
    }

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
            onResponse.success(responseJSON);
        } else {
            onResponse.error(responseJSON);
        }
    } catch (error) {
        error = "Network Error, Please check your Network connection";
        onResponse.error(error);
        if (onResponse.complete) {
            onResponse.complete();
        }
    }
}
