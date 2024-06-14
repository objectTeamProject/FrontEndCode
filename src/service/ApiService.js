import { API_BASE_URL } from "../app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
    let headers = new Headers({
        "Content-Type": "application/json",
    });
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };

    if (request) {
        if (method === "GET") {
            options.url += "?" + new URLSearchParams(request).toString();
        } else {
            options.body = JSON.stringify(request, getCircularReplacer());
        }//getCircularReplacer 추가함
    }
    return fetch(options.url, options)
        .then((response) =>
            response.json().then((json) => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        )
        .catch((error) => {
            console.log("Oops!");
            console.log(error.status);
            if (error.status === 403) {
                window.location.href = "/login";
            }
            return Promise.reject(error);
        });
}

export function signin(userDTO) {
    return call("/auth/signin", "POST", userDTO)
        .then((response) => {
            if (response.token) {
                localStorage.setItem("ACCESS_TOKEN", response.token);
                localStorage.setItem("USER_ID", response.id); // USER_ID 저장
                console.log("User ID saved:", response.id);
                window.location.href = "/";
            }
        });
}

export function signup(userDTO) {
    return call("/auth/signup", "POST", userDTO)
        .then((response) => {
            if (response.id) {
                window.location.href = "/";
            }
        })
        .catch((error) => {
            console.log("Oops!");
            if (error.status === 403) {
                window.location.href = "/auth/signup";
            }
            return Promise.reject(error);
        });
}

export function signout() {
    localStorage.setItem("ACCESS_TOKEN", null);
    window.location.href = "/";
}

//추가
export function account(){
    window.location.href="/account";
}

export function getUserInfo() {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    const request = { token: accessToken };
    return call("/auth/userinfo", "POST", request)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log("사용자 정보를 가져오는데 실패했습니다:", error);
            return Promise.reject(error);
        });
}
export function delaccount() {
    const userId = localStorage.getItem("USER_ID"); // 사용자 ID를 로컬 스토리지나 다른 방법으로 가져옴
    console.log("User ID to be deleted:", userId);
    if (!userId) {
        console.error("User ID not found");
        return Promise.reject("User ID not found");
    }

    const userDTO = { id: userId }; // ID만 포함하는 객체 생성
    return call("/auth/delaccount", "POST", userDTO)
    // return call("/auth/delaccount", "POST", { id: userId })
    .then((response) => {
        if (response.message === "User deleted successfully") {
            // return response;
            localStorage.removeItem("ACCESS_TOKEN");//
            localStorage.removeItem("USER_ID");//
            localStorage.setItem("message", "회원 탈퇴가 성공적으로 완료되었습니다.");
            window.location.href = "/login";//
        }else {
            console.error("회원 탈퇴 실패:", response);
            localStorage.setItem("message", "회원 탈퇴에 실패했습니다.");
            window.location.href = "/login";
        }
        return response;//
    })
    .catch((error) => {
        console.log("[del_acc]Oops!");
        localStorage.setItem("message", "회원 탈퇴 중 오류가 발생했습니다.");
        console.log(error.status);
        if (error.status === 403) {
            window.location.href = "/auth/delaccount";
        }
        return Promise.reject(error);
    });
}

function getCircularReplacer() {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
}