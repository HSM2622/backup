// 변경 사항 ctrl+F 로 @변경@ 검색

/* @변경@ styles폴더의 register.css -> LoginRegister.module.css 이름 변경
  page폴더의 _app.js 에서 register.css 문단 삭제
  */

import CommonLayout from "../components/layout/CommonLayout";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";

import styles from "../styles/LoginRegister.module.css"; // @변경@ 추가됨

// @변경@ 이미지 이름 일부 변경
import bgImg from "../public/loginpage.png";
import visible_icon from "../public/visible_icon.png";
import invisible_icon from "../public/invisible_icon.png";
import wrapImg from "../public/image1.png";
import lockIcon from "../public/image2.png";
import wrapLogo from "../public/title.png";

const signup = () => {
    const postFlag = false;
    const onClickPostButton = () => {
        if (pwCheck && emailCheck && phoneCheck && evfcheck) postFlag = true;
        if (postFlag)
            axios
                .post("/signup/post")
                .then((res) => console.log(res.data))
                .catch((err) => console.error(err));
        else alert("확인되지 않은 정보가 있습니다.");
    };

    const [PhoneNumber, setPhoneNumber] = useState("");
    const [Password, setPassword] = useState("");
    const [PasswordConfirm, setPasswordConfirm] = useState("");
    const [PasswordMsg, setPasswordMsg] = useState("");
    const [UserEmail, setUserEmail] = useState("");
    const [EmailMsg, setEmailMsg] = useState("");
    const [EvfMsg, setEvfMsg] = useState("");

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };
    const onPasswordConfirmHandler = (event) => {
        setPasswordConfirm(event.currentTarget.value);
    };
    const onPasswordMsgHandler = (event) => {
        setPasswordMsg(event.currentTarget.value);
    };
    const onUserEmailHandler = (event) => {
        setUserEmail(event.currentTarget.value);
    };
    const onEmailMsgHandler = (event) => {
        setEmailMsg(event.currentTarget.value);
    };
    const onEvfHandler = (event) => {
        setEvfMsg(event.currentTarget.value);
    };

    let emailCheck = false;
    const onEmailCheck = async () => {
        try {
            if (UserEmail) {
                const reg = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
                const sreg =
                    /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

                if (UserEmail.match(reg) || UserEmail.match(sreg)) {
                    let data = await axios.get(
                        `/signup/emailCheck/${UserEmail}`
                    );
                    console.log(data, "데이터");
                    const login_flag = data.data.login;
                    if (login_flag) {
                        setEmailMsg("사용할 수 있는 이메일입니다.");
                        return (emailCheck = true);
                    } else {
                        setEmailMsg("이미 존재하는 이메일입니다.");
                        return (emailCheck = false);
                    }
                } else {
                    setEmailMsg("이메일 양식을 확인해주세요.");
                    return (emailCheck = false);
                }
            } else {
                setEmailMsg("이메일을 입력해주세요.");
            }
            console.log(emailCheck);
        } catch (err) {
            console.error(err);
        }
    };

    let evfcheck = false;
    let sendEvfcode = "";
    const onEmailSend = async () => {
        console.log("코드 보냄");
        // setUserEmail(event.currentTarget.value);
        // setEvfMsg(event.currentTarget.value);
        console.log(useremail, "이메일");
        try {
            if (useremail) {
                if (!emailCheck) {
                    setEvfMsg("이메일을 확인해주세요.")
                    return;
                }
                const data = await axios.get(`/signup/evf/${useremail}`);
                sendEvfcode = data.data.sendEvfcode;
                alert("인증번호가 전송되었습니다. 이메일을 확인해주세요");
            } else {
                setEvfMsg("이메일을 확인해주세요.")
            }
            console.log(evfcheck);
        } catch (err) {
            console.error(err);
        }
    };

    let phoneCheck = false;
    const onPhoneNumberHandler = (event) => {
        // setPhoneNumber(event.currentTarget.value);
        const firstTel = PhoneNumber.substring(0, 3);
        if (PhoneNumber.length !== 11) {
            return (phoneCheck = false);
        }
        if (firstTel !== ("010" || "011" || "016" || "017" || "018" || "019")) {
            return (phoneCheck = false);
        }
        return (phoneCheck = true);
    };

    let pwCheck = false;
    const onPwcheck = (event) => {
        if (Password && PasswordConfirm) {
            if (Password === PasswordConfirm) {
                setPasswordMsg("비밀번호가 일치합니다.");
                pwCheck = true;
            } else {
                setPasswordMsg("비밀번호가 확인해주세요.");
                pwCheck = false;
            }
        }
    };

    return (
        // @변경@ <CommonLayout> 안 내용 교체
        <CommonLayout>
            <div className={styles.setting}>
                <Image
                    src={bgImg}
                    className={styles.bgImage}
                    alt="BackgroundImage"
                />
                <div className={styles.wrapper}>
                    <div className={styles.wrapBg} />
                    <div className={styles.formBg} />
                    <div // TEST 용 div
                        className="Test"
                        style={{
                            position: "absolute",
                            right: "0",
                            textAlign: "left",
                            width: "20%",
                            color: "white",
                            backgroundColor: "red",
                        }}
                    >
                        <p style={{ fontSize: "20px" }}>TEST</p>
                        <br />
                        <div>PasswordMsg:{PasswordMsg}</div>
                        <div>EmailMsg:{EmailMsg}</div>
                        <div>EvfMsg</div>
                    </div>
                    <div className={styles.signUp}>
                        <Image
                            src={lockIcon}
                            className={styles.lockImageIcon2}
                            alt="lockIcon"
                        />
                        <b className={styles.b2}>계정 만들기</b>
                        <div className={styles.firstName1}>
                            <div className={styles.box2} />
                            <div className={styles.placeholder}>성</div>
                            <div className={styles.div7}>
                                <span className={styles.footerTxt}>
                                    <input
                                        type="text"
                                        className={styles.copyrightWeighter}
                                    />
                                </span>
                            </div>
                        </div>
                        <div className={styles.lastName1}>
                            <div className={styles.box2} />
                            <div className={styles.placeholder}>이름</div>
                            <div className={styles.div7}>
                                <span className={styles.footerTxt}>
                                    <input
                                        type="text"
                                        className={styles.copyrightWeighter}
                                    />
                                </span>
                            </div>
                        </div>
                        <div className={styles.email1}>
                            <div className={styles.box2} />
                            <input
                                type="email"
                                className={styles.null}
                                onChange={onUserEmailHandler}
                                defaultValue={UserEmail}
                            />
                            <div className={styles.text6}>이메일 주소</div>
                        </div>
                        <button
                            type="button"
                            className={styles.emailCheck}
                            onClick={onEmailCheck}
                        >
                            <div className={styles.btn}>
                                <div className={styles.box} />
                                <div className={styles.div13}>확인</div>
                            </div>
                        </button>
                        <div className={styles.phonenumber}>
                            <div className={styles.box2} />
                            <div className={styles.text3}>휴대폰 번호</div>
                            <input
                                type="text"
                                className={styles.null1}
                                onChange={onPhoneNumberHandler}
                                defaultValue={PhoneNumber}
                            />
                        </div>
                        <div className={styles.password1}>
                            <div className={styles.box2} />
                            <div className={styles.text1}>비밀번호</div>
                            <div className={styles.invisibleIcon}>
                                <Image
                                    src={visible_icon}
                                    className={styles.visibleIcon3}
                                    alt="visibleIcon"
                                />
                                <div className={styles.invisible}>
                                    <Image
                                        src={invisible_icon}
                                        className={styles.invisibleChild}
                                        alt="invisibleIcon"
                                    />
                                </div>
                            </div>
                            <input
                                type="password"
                                className={styles.null1}
                                onChange={onPasswordHandler}
                                defaultValue={Password}
                            />
                        </div>
                        <div className={styles.comfirmPassword1}>
                            <div className={styles.box2} />
                            <div className={styles.text3}>비밀번호 확인</div>
                            <div className={styles.invisibleIcon}>
                                <Image
                                    src={visible_icon}
                                    className={styles.visibleIcon3}
                                    alt="visibleIcon"
                                />
                                <div className={styles.invisible}>
                                    <Image
                                        src={invisible_icon}
                                        className={styles.invisibleChild}
                                        alt="invisibleIcon"
                                    />
                                </div>
                            </div>
                            <input
                                type="input"
                                className={styles.null1}
                                onChange={onPasswordConfirmHandler}
                                defaultValue={PasswordConfirm}
                            />
                        </div>
                        <div className={styles.aZAZContainer1}>
                            <p className={styles.copyrightWeighter}>
                                8 ~ 14자 사이 입력 (0-9, a-z, A-Z)
                            </p>
                            <p className={styles.p}>
                                특수 문자 필요 (!, @, #, $, %)
                            </p>
                        </div>
                        <button
                            type="button"
                            className={styles.passwordCheck}
                            onClick={onPwcheck}
                        >
                            <div className={styles.btn}>
                                <div className={styles.div13}>확인</div>
                            </div>
                        </button>
                        <div className={styles.div12}>
                            <span>서비스 약관</span>
                            <span className={styles.span}>{`과 `}</span>
                            <span>개인 정보 정책</span>
                            <span className={styles.span}>에 동의합니다.</span>
                        </div>
                        <input
                            type="checkbox"
                            className={styles.checkBoxIcon}
                        />
                        <button
                            type="button"
                            className={styles.signupBox}
                            onClick={onClickPostButton}
                        >
                            <div className={styles.btn}>
                                <div className={styles.box} />
                                <div className={styles.div}>계정 생성</div>
                            </div>
                        </button>
                    </div>
                    <Image
                        src={wrapImg}
                        className={styles.imagebIcon}
                        alt="Image"
                    />
                    <Image
                        src={wrapLogo}
                        className={styles.logoIcon}
                        alt="Logo"
                    />
                </div>
            </div>
        </CommonLayout>
    );
};

export default signup;
