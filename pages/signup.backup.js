import CommonLayout from "../components/layout/CommonLayout";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";
import loginpage from "../public/loginpage.png"
import visible_icon from "../public/visible_icon.png"
import invisible_icon from "../public/invisible_icon.png"
import image1 from "../public/image1.png"
import image2 from "../public/image2.png"
import title from "../public/title.png"

const signup = () => {
  const postFlag = false;
    const onClickPostButton = () => {
      if (pwCheck && emailCheck && phoneCheck && evfcheck)
      postFlag = true;
      if (postFlag)
        axios
          .post('api/signup/post')
          .then((res) => console.log(res.data))
          .catch((err) => console.error(err));
          else
          alert('확인되지 않은 정보가 있습니다.');
      }

      const [PhoneNumber, setPhoneNumber] = useState("");
      const [Password, setPassword] = useState("");
      const [PasswordConfirm, setPasswordConfirm] = useState("");
      const [PasswordMsg, setPasswordMsg] = useState("");
      const [UserEmail, setUserEmail] = useState("");
      const [EmailMsg, setEmailMsg] = useState("");
      const [EvfMsg, setEvfMsg] = useState("");

      const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
      const onPasswordConfirmHandler = (event) => {
        setPasswordConfirm(event.currentTarget.value);
    }
      const onPasswordMsgHandler = (event) => {
        setPasswordMsg(event.currentTarget.value);
    }
      const onUserEmailHandler = (event) => {
        setUserEmail(event.currentTarget.value);
    }
      const onEmailMsgHandler = (event) => {
        setEmailMsg(event.currentTarget.value);
    }
      const onEvfHandler = (event) => {
        setEvfMsg(event.currentTarget.value);
    }

      let emailCheck = false;
const onEmailCheck = async () => {
    try {
        if (UserEmail) {
            const reg = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
            const sreg = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
            
            if (UserEmail.match(reg) || UserEmail.match(sreg)) {
                let data = await axios.get(`api/signup/emailCheck/${UserEmail}`);
                console.log(data, '데이터');    
                login_flag = data.data.login;
                if (login_flag) {
                    EmailMsg.innerHTML = "사용할수 있는 이메일 입니다.";
                    EmailMsg.style.color = 'green';
                    return emailCheck = true;
                } else {
                    EmailMsg.innerHTML = "이미 존재하는 이메일 입니다."
                    EmailMsg.style.color = 'red';
                    return emailCheck = false;
                }
            } else {
                EmailMsg.innerHTML = "이메일 양식을 확인해주세요";
                EmailMsg.style.color = 'red';
                return emailCheck = false;
            }
        } else {
            EmailMsg.innerHTML = "이메일을 입력해주세요";
            EmailMsg.style.color = 'red';
        }
        console.log(emailCheck);
    } catch (err) {
        console.error(err);
    }
  }

  let evfcheck = false;
  let sendEvfcode = '';
    const onEmailSend = async () => {
      console.log("코드 보냄")
      setUserEmail(event.currentTarget.value);
      setEvfMsg(event.currentTarget.value);
      console.log(useremail, "이메일");
      try {
          if (useremail) {
              if (!emailCheck) {
                  EvfMsg.innerHTML = "이메일을 확인해주세요";
                  EvfMsg.style.color = 'red';
                  return ;
              }
              const data = await axios.get(`/signup/evf/${useremail}`);
              sendEvfcode = data.data.sendEvfcode;
              alert('인증번호가 전송되었습니다. 이메일을 확인해주세요');
          } else {
              EvfMsg.innerHTML = "이메일을 확인해주세요";
              EvfMsg.style.color = 'red';
          }
          console.log(evfcheck);
      } catch (err) {
          console.error(err);
      }
  };


      let phoneCheck = false;
      const onPhoneNumberHandler = (e) => {
        setPhoneNumber(event.currentTarget.value);
        const firstTel = PhoneNumber.substring(0, 3);
        if (PhoneNumber.length !== 11) {
            return phoneCheck = false;
        }
        if (firstTel !== ('010' || '011' || '016' || '017' || '018' || '019')) {
            return phoneCheck = false;
        }
        return phoneCheck = true;
      }


      let pwCheck = false;
      const onPwcheck = (e) => {
        onPasswordHandler();
        onPasswordConfirmHandler();
          if (Password && PasswordConfirm) {
              if (Password === PasswordConfirm) {
                  PasswordMsg.innerHTML = "비밀번호가 일치합니다.";
                  PasswordMsg.style.color = 'green';
                  pwCheck = true;
              } else {
                  PasswordMsg.innerHTML = "비밀번호를 확인해주세요.";
                  PasswordMsg.style.color = 'red';
                  pwCheck = false;
              }
          }
      }


  return (
    <CommonLayout>
      <div className='loginPage'>
        <Image src={loginpage} className="loginPageChild" alt="loginpage"/>
      <div className='wrapper'>
        <div className='wrapper_backg' />
        <div className='loginb' />
        <div className='findAPassword'>
          <div className='reset'>
            <div className='resetBox'>
              <div className='idle'>
                <div className='box' />
                <div className='div'>확인</div>
              </div>
              <div className='hoverMouse'>
                <div className='box1' />
                <div className='div'>확인</div>
              </div>
            </div>
            <div className='div2'>비밀번호가 일치하지 않습니다.</div>
            <div className='comfirmPassword'>
              <div className='box2' />
              <div className='text'>비밀번호 확인</div>
              <div className='invisibleIcon'>
              <Image src={visible_icon} className="visibleIcon" alt="visible_icon"/>
                <div className='invisible'>
                <Image src={invisible_icon} className="invisibleChild" alt="invisible_icon"/>
                </div>
              </div>
              <div className='null'>null</div>
            </div>
            <div className='aZAZContainer'>
              <p className='aZAZ'>8 ~ 14자 사이 입력 (0-9, a-z, A-Z)</p>
              <p className='p'>특수 문자 필요 (!, @, #, $, %)</p>
            </div>
            <div className='password'>
              <div className='box2' />
              <div className='text1'>비밀번호</div>
              <div className='invisibleIcon'>
              <Image src={visible_icon} className="visibleIcon" alt="visible_icon"/>
                <div className='invisible'>
                  <Image src={invisible_icon} className="invisibleChild" alt="invisible_icon"/>
                </div>
              </div>
              <div className='null'>null</div>
            </div>
            <div className='div3'>새로운 비밀번호를 입력하세요.</div>
            <b className='b'>비밀번호 재설정</b>
            <div className='unlockImage'>
            <Image src={image2} className="invisibleChild" alt="image2"/>
              <div className='unlock' />
            </div>
          </div>
          <div className='reset'>
            <div className='resetBox'>
              <div className='idle'>
                <div className='box' />
                <div className='div'>확인</div>
              </div>
              <div className='hoverMouse'>
                <div className='box1' />
                <div className='div'>확인</div>
              </div>
            </div>
            <div className='div6'>
              이름 또는 이메일 주소가 일치하지 않습니다.
            </div>
            <div className='email'>
              <div className='box2' />
              <div className='null2'>null</div>
              <div className='text2'>이메일 주소</div>
            </div>
            <div className='lastName'>
              <div className='box2' />
              <div className='placeholder'>이름</div>
              <div className='div7'>
                <span className='txt'>
                  <p className='aZAZ'>재혁</p>
                </span>
              </div>
            </div>
            <div className='firstName'>
              <div className='box2' />
              <div className='placeholder'>성</div>
              <div className='div7'>
                <span className='txt'>
                  <p className='aZAZ'>오</p>
                </span>
              </div>
            </div>
            <div className='div3'>
              계정 생성 시 입력했던 이름과 이메일을 입력하세요.
            </div>
            <b className='b'>비밀번호 찾기</b>
            <div className='unlockImage'>
            <Image src={image2} className="invisibleChild" alt="image2"/>
              <div className='unlock' />
            </div>
          </div>
        </div>
        <div className='signUp'>
          <div className='signupBox'>
            <div className='idle'>
              <div className='box' />
              <div className='div'>계정 생성</div>
            </div>
            <div className='hoverMouse'>
              <div className='box1' />
              <div className='div'>계정 생성</div>
            </div>
          </div>
          <input type='checkbox' className='checkBoxIcon' value='agree'/>
          <div className='div12'>
            <span>서비스 약관</span>
            <span className='span'>{`과 `}</span>
            <span>개인 정보 정책</span>
            <span className='span'>에 동의합니다.</span>
          </div>
          <div className='comfirmPassword1'>
            <div className='box2' />
            <div className='text'>비밀번호 확인</div>
            <div className='invisibleIcon'>
            <Image src={visible_icon} className="visibleIcon" alt="visible_icon"/>
              <div className='invisible'>
              <Image src={invisible_icon} className="invisibleChild" alt="invisible_icon"/>
              </div>
            </div>
            <div className='null'>null</div>
          </div>
          <div className='aZAZContainer1'>
            <p className='aZAZ'>8 ~ 14자 사이 입력 (0-9, a-z, A-Z)</p>
            <p className='p'>특수 문자 필요 (!, @, #, $, %)</p>
          </div>
          <div className='password1'>
            <div className='box2' />
            <div className='text1'>비밀번호</div>
            <div className='invisibleIcon'>
            <Image src={visible_icon} className="visibleIcon" alt="visible_icon"/>
              <div className='invisible'>
              <Image src={invisible_icon} className="invisibleChild" alt="invisible_icon"/>
              </div>
            </div>
            <div className='null'>null</div>
          </div>
          <div className='email1'>
            <div className='box2' />
            <div className='null2'>null</div>
            <div className='text5'>이메일 주소</div>
          </div>
          <div className='lastName1'>
            <div className='box2' />
            <div className='placeholder'>이름</div>
            <div className='div7'>
              <span className='txt'>
                <p className='aZAZ'>재혁</p>
              </span>
            </div>
          </div>
          <div className='firstName1'>
            <div className='box2' />
            <div className='placeholder'>성</div>
            <div className='div7'>
              <span className='txt'>
                <p className='aZAZ'>오</p>
              </span>
            </div>
          </div>
          <b className='b2'>계정 만들기</b>
          <Image src={image2} className="lockImageIcon2" alt="image2"/>
        </div>
        <div className='signIn'>
          <div className='div15'>비밀번호를 잊으셨나요?</div>
          <div className='div16'>계정 만들기</div>
          <div className='div17'>계정이 존재하지 않나요?</div>
          <div className='loginBox'>
            <div className='idle'>
              <div className='box' />
              <div className='div'>로그인</div>
            </div>
            <div className='hoverMouse'>
              <div className='box1' />
              <div className='div'>로그인</div>
            </div>
          </div>
          <div className='password2'>
            <div className='box2' />
            <div className='text6'>비밀번호</div>
            <div className='invisibleIcon'>
            <Image src={visible_icon} className="visibleIcon" alt="visible_icon"/>
              <div className='invisible'>
              <Image src={invisible_icon} className="invisibleChild" alt="invisible_icon"/>
              </div>
            </div>
          </div>
          <div className='email2'>
            <div className='box2' />
            <div className='text7'>이메일 주소</div>
          </div>
          <b className='b3'>로그인</b>
          <img
            className='loginImageIcon'
            alt=""
            src="../login-image@2x.png"
          />
        </div>
        <Image src={image1} className="imagebIcon" alt="image1"/>
        <Image src={title} className="logoIcon" alt="title"/>
      </div>
    </div>
    </CommonLayout>
  );
};

export default signup;
