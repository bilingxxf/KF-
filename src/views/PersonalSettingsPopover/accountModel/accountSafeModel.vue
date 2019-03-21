<template>
  <div id="personalPopover">
  	<div class="backHui" id="huisekuang">
  		<!-- 绑定谷歌浏览器 -->
  		<!--v-show="googleTestShow"-->
  		<div class="googleTest" v-show="googleTestShow">
  			<div class="close" @click="cancelClose('googleData')">
          <span class="icon-wrong"></span>
        </div>
  			<div class="googleTestTop">
  				<div class="googleTestTopTitle">绑定谷歌验证器</div>
  				<!--<div class="googleTestTopContent">谷歌验证器是一款动态口令工具，工作原理类似短信动态后30s产生一个动态验证码，验证码可用于登录，体现，修改安全设置等操作的安全验证</div>-->
  			</div>
  			<div class="googleTestBottom">
  				<div class="testOne">
  					<div class="QRcode">
  						<div class="QRcodePic">
  							<img :src="googleQrMessage.QrCode" alt="2" class="QrCodePng">
  						</div>
  						<div class="QRcodeCopy">
  							<div class="QRcodeTitle">密钥：<span ref="secretKeyCopy">{{googleQrMessage.secret}}</span> <span class="Copy" @click="copyCopy()">复制</span></div>
  							<!--<div class="QRcodeNum"><span class="left" ref="secretKeyCopy">{{googleQrMessage.secret}}</span></div>-->
  						</div>
  					</div>
  				</div>
  				<div class="notice-word">请使用手机下载谷歌验证器扫描二维码或输入密钥生成6位验证码</div>
  				<div class="testThree">
            <Form :model="googleTest" class="accountSettingInputPopover padding-label" ref="googleData" :rules="googleRules">
              <FormItem label="验证码" class="padding-40" prop="testContent" style="margin-left: 2rem;">
                  <Input type="text" v-model="googleTest.testContent" placeholder="请输入谷歌验证码" class="accountSettingInput limitWidth limitHeight"></Input>
              </FormItem>

              <FormItem class="btn btnLarge">
                <Button type="primary" :loading="bindGoogleLoading" @click="bindingGoogle('googleData')" class="left">确定</Button>
                <Button type="primary" @click="cancelClose('googleData')" class="right margin-right">取消</Button>
              </FormItem>

            </Form>
  				</div>
  			</div>
  		</div>
			
			<div class="googleTest" v-show="editgoogleTestShow">
  			<div class="close" @click="cancelClose('googleData')">
          <span class="icon-wrong"></span>
        </div>
  			<div class="googleTestTop">
  				<div class="googleTestTopTitle">绑定谷歌验证器</div>
  				<!--<div class="googleTestTopContent">谷歌验证器是一款动态口令工具，工作原理类似短信动态后30s产生一个动态验证码，验证码可用于登录，体现，修改安全设置等操作的安全验证</div>-->
  			</div>
  			<div class="googleTestBottom">
  				<div class="testOne">
  					<div class="QRcode">
  						<div class="QRcodePic">
  							<img :src="googleQrMessage.QrCode" alt="2" class="QrCodePng">
  						</div>
  						<div class="QRcodeCopy">
  							<div class="QRcodeTitle">密钥：<span ref="secretKeyCopy">{{googleQrMessage.secret}}</span> <span class="Copy" @click="copyCopy()">复制</span></div>
  							<!--<div class="QRcodeNum"><span class="left" ref="secretKeyCopy">{{googleQrMessage.secret}}</span></div>-->
  						</div>
  					</div>
  				</div>
  				<div class="notice-word">请使用手机下载谷歌验证器扫描二维码或输入密钥生成6位验证码</div>
  				<div class="testThree">
            <Form :model="googleTest" class="accountSettingInputPopover padding-label" ref="googleData" :rules="googleRules">
              <FormItem label="验证码" class="padding-40" prop="testContent" style="margin-left: 2rem;">
                  <Input type="text" v-model="googleTest.testContent" placeholder="请输入谷歌验证码" class="accountSettingInput limitWidth limitHeight"></Input>
              </FormItem>

              <FormItem class="btn btnLarge">
                <Button type="primary" :loading="bindGoogleLoading" @click="bindingGoogle('googleData')" class="left">确定</Button>
                <Button type="primary" @click="cancelClose('googleData')" class="right margin-right">取消</Button>
              </FormItem>

            </Form>
  				</div>
  			</div>
  		</div>
			
  	  <!-- 新建密钥 -->
  		<div class="centered newKey" v-show="centeredShow">
  			<div class="close" @click="cancelClose('apiData')">
          <span class="icon-wrong"></span>
        </div>
  			<div class="centeredPadding">
  				<div class="centeredTitle">
	  				{{bindOrChangePhone?$t(`message.BaseInfo.BindPhone`):$t(`message.BaseInfo.EditBindPhone`)}}
	  			</div>
          <Form :model="secretKeydatas"  class="accountSettingInputPopover special" ref="apiData" :rules="secretKeyRules">
            <FormItem prop="tips" :label="$t(`message.Note`)" >
                <Input type="text" v-model="secretKeydatas.tips" :placeholder="$t(`message.accountSet.PleaseEnterNotes`)" class="accountSettingInput" :maxlength='50'></Input>
            </FormItem>
            <FormItem prop="ipAddress" :label="$t(`message.accountSet.BindIPAddress`)">
                <Input type="text" v-model="secretKeydatas.ipAddress" :placeholder="$t(`message.accountSet.EnterIpAddress`)" class="accountSettingInput"></Input>
            </FormItem>
            <FormItem class="btn">
              <Button v-if="modifyOrNewApi" type="primary" @click="changeAapi(apiID,'apiData')" class="left">确定</Button>
              <Button v-else type="primary" @click="newAKey('apiData')" class="left">确定</Button>
              <Button  type="primary" @click="cancelClose('apiData')" class="right">取消</Button>
            </FormItem>
          </Form>
  			</div>
  		</div>

  		<!-- 重置登录密码 -->
  		<div class="centered loginPassword" v-show="loginPassword">
  			<div class="close" @click="cancelClose('changeLoginPsd')">
          <span class="icon-wrong"></span>
        </div>
  			<div class="centeredPadding">
  				<div class="centeredTitle">
	  				重置登录密码
	  			</div>
          <Form :model="changeLoginPasswords"  class="accountSettingInputPopover special" ref="changeLoginPsd" :rules="changeLoginPsdRules">
            <FormItem prop="oldpsw" label="原始密码" >
                <Input type="password" v-model="changeLoginPasswords.oldpsw" placeholder="输入原始登录密码" class="accountSettingInput" autocomplete="off"></Input>
            </FormItem>
            <FormItem prop="newpsw" label="新密码">
                <Input type="password" v-model="changeLoginPasswords.newpsw" placeholder="请输入新登录密码" class="accountSettingInput" autocomplete="off"></Input>
            </FormItem>
             <FormItem prop="newpswagain" label="确认新密码">
                <Input type="password" v-model="changeLoginPasswords.newpswagain" placeholder="确认新密码" class="accountSettingInput" autocomplete="off"></Input>
            </FormItem>
            <FormItem class="btn">
              <Button type="primary" @click="changeLoginPassword('changeLoginPsd')" class="left">确定</Button>
              <Button type="primary" @click="cancelClose('changeLoginPsd')" class="right">取消</Button>
            </FormItem>
          </Form>
  			</div>
  		</div>

  		<!-- 验证旧手机号 -->
  		<div class="centered verifyPhoneNumber" v-show="verifyPhoneNumber">
  			<div class="close" @click="cancelClose('testPhoneNmber')">
          <span class="icon-wrong"></span>
        </div>
  			<div class="centeredPadding">
  	   		<div class="centeredTitle">
	  			验证旧手机号码
	  			</div>
          <Form :model="formTop"  class="testPhoneNmber accountSettingInputPopover" :rules="testPhoneRules" ref="testPhoneNmber">
              <FormItem prop="input1">
                <div class="title">
                  <div class="titleLeft">手机号码</div>
                  <div class="titleRight"><span>{{internationalCode}}&nbsp;</span><span>{{encryptPhoneNumber}}</span></div>
                </div>
                <Input v-model="formTop.input1" placeholder="请输入绑定的11位手机号" class="accountSettingInput"></Input>
              </FormItem>
              <FormItem class="btn">
                  <Button type="primary" @click="nextPhoneNumber('testPhoneNmber')" class="left">确定</Button>
                  <Button type="primary" @click="cancelClose('testPhoneNmber')" class="right">取消</Button>
              </FormItem>
          </Form>
  			</div>
  		</div>

  		<!-- 设置新手机号 -->
  		<div class="centered changePhoneNumber" v-show="changePhoneNumber">
  			<div class="close" @click="cancelClose('phoneNumChangeData')">
          <span class="icon-wrong"></span>
        </div>
  			<div class="centeredPadding">
  				<div class="centeredTitle">
	  				{{bindOrChangePhone?'绑定手机号码':'修改绑定手机号码'}}
	  			</div>
          <Form :model="phoneNumChange" class="accountSettingInputPopover special menu selectInternational" ref="phoneNumChangeData" :rules="phoneNumChangeRules">
            <div class="titltContent">
              <div class="title">手机号码</div>
              <div class="Input3">
                <div class="select">
                  <div class="login accountPhone">
                    <div class="national">
                      <FormItem prop="model9">
                         <Dropdown trigger="click" @on-click="langOperate" @on-visible-change="clearSearch" class="nationalNum nationalDrop nationPhoneAdd" >
                          <!--  <a href="javascript:void(0)">
                             {{ $t(`message.OTCOrder.Choose`) }}
                             <Icon type="ios-arrow-down"></Icon>
                           </a> -->
                           <a href="javascript:void(0)">
                             {{phoneNumChange.model9}}
                             <Icon type="ios-arrow-down"></Icon>
                           </a>
                           <DropdownMenu slot="list">
                             <Input v-model="search" class="search-input" icon="ios-search" placeholder="搜索区号..." />
                             <DropdownItem v-for="(option, index) in areaPhoneNumBefores" v-show="option.country_idd.includes(search) || option.country_name.includes(search)" :name="option.country_idd" :key="index">
                               <div class="national-wrap">
                                 <span class="national-left">{{option.country_name}}</span>
                                 <span class="national-right">{{option.country_idd}}</span>
                               </div>
                             </DropdownItem>
                           </DropdownMenu>
                         </Dropdown>
                      </FormItem>
                    </div>
                  </div>
                </div>
                <FormItem class="enterPhoneNumber" prop="numberPhone">
                  <Input type="text" placeholder="请输入手机号" class="accountSettingInput specialRight" v-model="phoneNumChange.numberPhone"></Input>
                </FormItem>
                <div class="clear"></div>
              </div>
            </div>
            <div class="titltContent">
              <div class="title">短信验证码</div>
              <div class="Input2">
                <FormItem class="authCodeLeft" prop="numberAuthCode">
                  <Input type="text" placeholder="请输入6位短信验证码" class="accountSettingInput specialLeft" v-model="phoneNumChange.numberAuthCode"></Input>
                </FormItem>
                <!--<Button type="info" class="authCode" @click="telephone_code('phoneNumChangeData')" v-if="count == 60" :loading="loadingCode">获取验证码</Button>
                <Button type="primary" disabled v-else class="authCode huiCanTbtn">重新发送 {{count}}</Button> -->
                
                <Button type="info" class="authCode" @click="telephone_code('phoneNumChangeData')" v-if="count == 60" :loading="loadingCode">获取验证码</Button>
                <Button type="primary" disabled v-else class="authCode huiCanTbtn"> {{count}}</Button>
                
                <div class="clear"></div>
              </div>
            </div>
            <FormItem class="btn">
              <Button v-if="bindOrChangePhone" type="primary" @click="bindPhoneNumber('phoneNumChangeData')" class="left">绑定</Button>
              <Button v-else type="primary" @click="exchangePhoneNumber('phoneNumChangeData')" class="left">确定</Button>
              <Button type="primary" @click="cancelClose('phoneNumChangeData')" class="right">取消</Button>
            </FormItem>
          </Form>
  			</div>
  		</div>

		  <!-- 重设资金密码(安全验证) -->
  		<div class="centered fundPasswordSafe" v-show="fundPasswordSafe">
  			<div class="close" @click="cancelClose('pinPswBeforeData')">
          <span class="icon-wrong"></span>
        </div>
  			<div class="centeredPadding">
  				<div class="centeredTitle" v-if="bindOrchangePin">重新设置资金密码</div>
          <div class="centeredTitle" v-else>设置资金密码</div>
          <Form :model="pinPasswordBefore" label-positon="top" class="accountSettingInputPopover special menu special2" ref="pinPswBeforeData" :rules="pinPswBeforeRules">
            <div class="titltContent">
              <div class="title">安全验证</div>
              <div class="Input4">
                <input type="text" :placeholder="$t(`message.Register.EnterBindEmailN`)" class="safetyVerification" v-model="fundPasswordSafeEmail" disabled />
                <Button type="info" class="safetyVerificationBtn" @click="resetdealPasswordGetCode()" v-if="countEmail == 60" :loading="loadingCodeEmail">获取验证码</Button>
                <Button type="primary" disabled v-else class="safetyVerificationBtn huiVerification"> {{countEmail}}</Button>
              </div>
            </div>
            <FormItem prop="pinAuthCode" :label="$t(`message.Nav.VerifiCode`)">
              <Input type="text" v-model="pinPasswordBefore.pinAuthCode" placeholder="请输入验证码" class="accountSettingInput"></Input>
            </FormItem>
            <FormItem class="btn">
              <Button type="primary" @click="newFundPasswordNext('pinPswBeforeData')" class="left">确定</Button>
              <Button type="primary" @click="cancelClose('pinPswBeforeData')" class="right">取消</Button>
            </FormItem>
          </Form>
  			</div>
  		</div>

  	  <!-- 重设新的资金密码 -->
  		<div class="centered ResetfundPassword" v-show="ResetfundPassword">
  			<div class="close" @click="cancelClose('changePinPsd')">
          <span class="icon-wrong"></span>
        </div>
  			<div class="centeredPadding">
  				<div class="centeredTitle" v-if="bindOrchangePin">重新设置资金密码</div>
          <div class="centeredTitle" v-else>设置资金密码</div>
          <Form :model="changePinPassword"  class="accountSettingInputPopover special" ref="changePinPsd" :rules="changePinPsdRules" autocomplete="on" >
            <FormItem prop="psw" :label="$t(`message.BaseInfo.NewTradePsw`)" >
                <Input type="password" v-model="changePinPassword.psw" :placeholder="$t(`message.BaseInfo.EnterTradeNewPsw`)" class="accountSettingInput" autocomplete="off"></Input>
            </FormItem>
            <FormItem prop="pswTwo" :label="$t(`message.accountSet.CofirmTradePsw`)">
                <Input type="password" v-model="changePinPassword.pswTwo" :placeholder="$t(`message.accountSet.CofirmTradePsw`)" class="accountSettingInput" autocomplete="off"></Input>
            </FormItem>
            <FormItem class="btn">
              <Button v-if="bindOrchangePin" type="primary" @click="changeDealPassword('changePinPsd')" class="left">确定</Button>
              <Button v-else type="primary" @click="setDealPassword('changePinPsd')" class="left">确定</Button>
              <Button type="primary" @click="cancelClose('changePinPsd')" class="right">取消</Button>
            </FormItem>
          </Form>
  			</div>
  		</div>

      <!--  删除确认弹窗 -->
      <div class="centered comfirmDelete" v-show="comfirmDelete">
        <div class="close" @click="cancelClose('apiData')">
          <span class="icon-wrong"></span>
        </div>
        <div class="centeredPadding">
          <div class="centeredTitle">{{$t(`message.accountSet.DeleteNotice`) }}</div>
          <p class="deleteTips">{{$t(`message.accountSet.APIWillDelete`) }}</p>
          <div class="twoBtn">
            <input type="button" class="btnfour" :value="$t(`message.BaseInfo.Confirm`)" @click="delApiOne(apiID)" />
            <div class="cancelRight btnfour" @click="cancelClose('apiData')">取消</div>
          </div>
        </div>
      </div>

      <!-- 设置生日 -->
      <div class="centered setBirthday" v-show="setBirthday">
        <div class="close" @click="cancelClose('birthData')">
          <span class="icon-wrong"></span>
        </div>
        <div class="centeredPadding">
          <div class="birthTitle">{{ $t(`message.BaseInfo.SetBirthDate`) }}</div>
          <Form :model="birthDatas" ref="birthData" :rules="birthRules" >
            <div class="dateSelect" ref="dateSelect">
              <div class='fixedFour'>
                <div class="labelLeft">{{ $t(`message.OTCOrder.Choose`) }}:</div>
                <FormItem prop="yearNum">
                  <Select v-model="birthDatas.yearNum" size="large" style="width:5rem" :placeholder="$t(`message.BaseInfo.Year`)" class="dateSelectType" @on-open-change="callOpen1">
                    <OptionGroup :label="$t(`message.BaseInfo.Year`)">
                      <Option v-for="item in yearList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </OptionGroup>
                  </Select>
                </FormItem>
                <div class="middleLine"></div>
                <FormItem prop="monthNum">
                  <Select v-model="birthDatas.monthNum" size="large" style="width:5rem" :placeholder="$t(`message.BaseInfo.Month`)" class="dateSelectType" @on-open-change="callOpen2">
                    <OptionGroup :label="$t(`message.BaseInfo.Month`)">
                      <Option v-for="item in monthsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </OptionGroup>
                  </Select>
                </FormItem>
                <div class="middleLine"></div>
                <FormItem prop="dayNum">
                  <Select v-model="birthDatas.dayNum" size="large" style="width:5rem" :placeholder="$t(`message.BaseInfo.Day`)" class="dateSelectType" @on-open-change="callOpen3">
                    <OptionGroup :label="$t(`message.BaseInfo.Day`)">
                      <Option v-for="item in daysList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </OptionGroup>
                  </Select>
                </FormItem>
              </div>
            </div>
            <div class="generalbtn">
              <input type="button" class="btnfour" :value="$t(`message.BaseInfo.Confirm`)" @click="submitBirth('birthData')"/>
              <div class="cancelRight btnfour" @click="cancelClose('birthData')">取消</div>
            </div>
          </Form>
        </div>
      </div>

      <!-- 简介编辑 -->
      <div class="centered briefIntro" v-show="briefIntro">
        <div class="close" @click="cancelClose('briefIntroData')">
          <span class="icon-wrong"></span>
        </div>
        <div class="centeredPadding">
          <div class="birthTitle">{{ $t(`message.BaseInfo.SetPersonIntroduce`) }}</div>
          <Form :model="briefIntroDatas" ref="briefIntroData" :rules="briefIntroRules" class="briefIntroTip marginThirty">
            <FormItem prop="data">
              <Input type="textarea" v-model="briefIntroDatas.data" :placeholder="$t(`message.BaseInfo.NothingHere`)" >
              </Input>
            </FormItem>
            <div class="generalbtn thirtybtn">
              <input type="button" class="btnfour" :value="$t(`message.BaseInfo.Confirm`)" @click="briefBtn('briefIntroData')"/>
              <div class="cancelRight btnfour" @click="cancelClose('briefIntroData')">取消</div>
            </div>
          </Form>
        </div>
      </div>

      <!-- 性别设置 -->
      <div class="centered setSex" v-show="setSex">
        <div class="close" @click="cancelClose()">
          <span class="icon-wrong"></span>
        </div>
        <div class="centeredPadding">
          <div class="birthTitle">{{$t(`message.BaseInfo.ChooseGender`)  }}</div>
          <Form :model="sexDatas" ref="sexData" class="radioSEX">
            <FormItem>
                <RadioGroup v-model="sexDatas.male">
                  <Radio label="1">{{ $t('message.BaseInfo.male') }}</Radio>
                  <Radio label="2">{{ $t('message.BaseInfo.Female') }}</Radio>
                </RadioGroup>
            </FormItem>
            <div class="generalbtn">
              <input type="button" class="btnfour" :value="$t((`message.BaseInfo.Confirm`))" @click="sexBtn($event)"/>
              <div class="cancelRight btnfour" @click="cancelClose()">取消</div>
            </div>
          </Form>
        </div>
      </div>

      <!-- 上传头像 -->
      <div class="centered" v-show="changeAvatar">
        <div class="close" @click="cancelClose()">
          <span class="icon-wrong"></span>
        </div>
        <div class="centeredPadding">
          <div class="birthTitle">更换头像</div>
          <div class="chatHeads" >
            <div class="uploadAvatarOut">
              <img v-if="srcAvatar" :src="srcAvatar" alt="" class="uploadAvatar">
              <img v-else src="../../../../static/img/avatar.svg" alt="" class="uploadAvatar" />
              <label for="fileTouDa" class="labelAvat"></label>
              <input type="file" accept='image/*' id="fileTouDa" @change="changeAvatars($event)" class="avatarInputTop" />
            </div>


            <div class="localUpload">
              <label for="fileTou" class="labelFile">本地上传</label>
              <input type="file" id="fileTou" class="changes" accept='image/*' @change="changeAvatars($event)" />
            </div>

          </div>
          <Form class="accountSettingInputPopover special menu special2">
            <FormItem class="btn">
              <Button type="primary" @click="submitAvatars()" class="left" :loading="fileLoading" :disabled="cancelDisable">确定</Button>
              <Button type="primary" @click="cancelClose()" class="right" :diasbled="cancelDisable">取消</Button>
            </FormItem>
          </Form>

        </div>
      </div>

      <!-- 二次验证的开启关闭的验证 -->
      <div class="centered " v-show="twoVerificationJudge">
        <div class="close" @click="cancelClose('twiceTestDatasRef')">
          <span class="icon-wrong"></span>
        </div>
        <div class="centeredPadding">
          <div class="centeredTitle">选择认证方式</div>
            <Form class="accountSettingInputPopover special menu twentyFourbig" ref="twiceTestDatasRef" :model="twiceTestDatas" :rules="twiceTestRules">

              <div class="titltContent">
                <div class="input">
                  <div class="testTwiceSelector" ref="twiceTestHeightChange">
                    <FormItem prop="twiceTestSelect" label="验证方式">
                      <Select v-model="twiceTestDatas.twiceTestSelect" style="width:22.9rem" placeholder="请选择验证方式" @on-open-change="testSelectHeight">
                        <Option v-for="item in secondOrderSelect" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </FormItem>
                  </div>
                </div>
              </div>
              <!-- 手机的 -->
              <div class="titltContent" v-if="twiceTestDatas.twiceTestSelect == '2'">
                <div class="title" >请填写手机收到的验证码</div>
                <div class="Input2">
                  <FormItem class="authCodeLeft" prop="secondCode">
                    <Input type="text"  placeholder="请输入验证码" class="accountSettingInput specialLeft" v-model="twiceTestDatas.secondCode"></Input>
                  </FormItem>
                  <Button type="info" class="authCode" @click="twiceTestSendPhone()" v-if="countVerifyP == 60" :loading="loadingCodeTestp">获取验证码</Button>
                  <Button type="primary" disabled v-else class="authCode huiCanTbtn">{{countVerifyP}}</Button>
                  <div class="clear"></div>
                </div>
              </div>
              <!-- 邮箱的 -->
              <div class="titltContent twentyFour" v-if="twiceTestDatas.twiceTestSelect == '1'">
                <div class="title">请填写邮箱收到的验证码</div>
                <div class="Input2">
                  <FormItem class="authCodeLeft" prop="secondCode">
                    <Input type="text"  placeholder="请输入验证码" class="accountSettingInput specialLeft" v-model="twiceTestDatas.secondCode"></Input>
                  </FormItem>
                  <Button type="info" class="authCode" @click="twiceTestSendEmail()" v-if="countVerifyE == 60" :loading="loadingCodeTeste">获取验证码</Button>
                  <Button type="primary" disabled v-else class="authCode huiCanTbtn"> {{countVerifyE}}</Button>
                  <div class="clear"></div>
                </div>
              </div>
             <!--  谷歌的 -->
              <FormItem prop="secondCode" label="请填写谷歌验证器收到的验证码" class="twentyFourAgain" v-if="twiceTestDatas.twiceTestSelect == '3'">
                  <Input type="text" v-model="twiceTestDatas.secondCode" placeholder="请输入验证码" class="accountSettingInput"></Input>
              </FormItem>
              <FormItem class="btn">
                <Button type="primary" :loading="twoVerifyLoading"  @click="twiceTestOpenClose('twiceTestDatasRef')" class="left">确定</Button>
                <Button type="primary" @click="cancelClose('twiceTestDatasRef')" class="right">取消</Button>
              </FormItem>
            </Form>
        </div>
      </div>
      <!-- 二次验证之后的3个验证的操作开启关闭 -->
      <div class="centered" v-show="threeVerificationTest">
        <div class="close" @click="cancelClose('threeTestDatasRef')">
          <span class="icon-wrong"></span>
        </div>
        <div class="centeredPadding">
          <div class="centeredTitle">操作认证</div>
            <Form  class="accountSettingInputPopover special menu twentyFourbig" ref="threeTestDatasRef" :model="threeTestDatas" :rules="threeTestRules">
              <!-- 手机的 -->
              <div class="titltContent twentyFour" v-if="whichTest=='1'">
                <div class="title">请填写手机收到的验证码</div>
                <div class="Input2">
                  <FormItem class="authCodeLeft" prop="secondCode">
                    <Input type="text"  placeholder="请输入验证码" class="accountSettingInput specialLeft" v-model="threeTestDatas.secondCode"></Input>
                  </FormItem>
                  <Button type="info" class="authCode" @click="twiceTestSendPhone()" v-if="countVerifyP == 60" :loading="loadingCodeTestp">获取验证码</Button>
                  <Button type="primary" disabled v-else class="authCode huiCanTbtn"> {{countVerifyP}}</Button>
                  <div class="clear"></div>
                </div>
              </div>
              <!-- 邮箱的 -->
              <div class="titltContent twentyFour" v-if="whichTest=='2'">
                <div class="title">请填写邮箱收到的验证码</div>
                <div class="Input2">
                  <FormItem class="authCodeLeft" prop="secondCode">
                    <Input type="text"  placeholder="请输入验证码" class="accountSettingInput specialLeft" v-model="threeTestDatas.secondCode"></Input>
                  </FormItem>
                  <Button type="info" class="authCode" @click="twiceTestSendEmail()" v-if="countVerifyE == 60" :loading="loadingCodeTeste">获取验证码</Button>
                  <Button type="primary" disabled v-else class="authCode huiCanTbtn"> {{countVerifyE}}</Button>
                  <div class="clear"></div>
                </div>
              </div>
             <!--  谷歌的 -->
              <FormItem prop="secondCode" :label="$t(`message.accountSet.PLeaseEnterGGVC`)" class="twentyFourAgain" v-if="whichTest=='3'">
                  <Input type="text" v-model="threeTestDatas.secondCode" placeholder="请输入验证码" class="accountSettingInput"></Input>
              </FormItem>
              <FormItem class="btn">
                <Button type="primary" :loading="threeVerifyLoading"  @click="threeWhichSure('threeTestDatasRef')" class="left">确定</Button>
                <Button type="primary" @click="cancelClose('threeTestDatasRef')" class="right">取消</Button>
              </FormItem>
            </Form>
        </div>
      </div>
      <!-- 绑定邮箱的弹窗 -->
      <div class="centered changePhoneNumber" v-show="bindEmail">
        <div class="close" @click="cancelClose('emailBindDataRef')">
          <span class="icon-wrong"></span>
        </div>
        <div class="centeredPadding">
          <div class="centeredTitle">
           	绑定邮箱
          </div>
          <Form :model="emailBindData" class="accountSettingInputPopover special menu" ref="emailBindDataRef" :rules="emailBindDataRules">
            <div class="titltContent">
              <div class="title">邮箱</div>
              <div class="Input3 inputLong">
                <FormItem class="enterPhoneNumber" prop="emailNum">
                  <Input type="text"  placeholder="请输入邮箱号" class="accountSettingInput" v-model="emailBindData.emailNum"></Input>
                </FormItem>
              </div>
            </div>
            <div class="titltContent">
              <div class="title">邮箱验证码</div>
              <div class="Input2">
                <FormItem class="authCodeLeft" prop="emailCode">
                  <Input type="text"  placeholder="请输入6位邮箱验证码" class="accountSettingInput specialLeft" v-model="emailBindData.emailCode"></Input>
                </FormItem>
                <Button type="info" class="authCode" @click="bindEamilNumberSend('emailBindDataRef')" v-if="countLastEmail == 60" :loading="loadingCodeLastEmail">获取验证码</Button>
                <Button type="primary" disabled v-else class="authCode huiCanTbtn">{{countLastEmail}}</Button>
                <div class="clear"></div>
              </div>
            </div>
            <FormItem class="btn">
              <Button  type="primary" @click="bindEamilNumberTest('emailBindDataRef')" class="left">确定</Button>
              <Button type="primary" @click="cancelClose('emailBindDataRef')" class="right">取消</Button>
            </FormItem>
          </Form>
        </div>
      </div>

  	</div>
  </div>
</template>
<script>
import api from '../../../api'
import axios from 'axios'
import config from '../../../../static/config'
import resOnline from './../../../../static/configOnline'
import utils from '../../../utils'
export default {
  name: 'personalPopover',
  data(){
    const validatePhonenumber = (rule,value,callback)=>{
      if(!value){
        return callback(new Error('请输入手机号码'));
      } else{
        if(this.phoneNumChange.model9 == '+86' &&  (!/^1[34578]\d{9}$/.test(value))) {
					callback(new Error('请输入正确的手机号码'));
				}else if(this.phoneNumChange.model9 != '+86' && (!/^[0-9]{2,20}$/.test(value))){
					callback(new Error('请输入正确的手机号码'));
				}else {
					callback();
				}
      }
    };
    const validatPass = (rule,value,callback)=>{
      if (!value) {
          callback(new Error('请输入资金密码'));
      }else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,15}$/.test(value)){
        return callback(new Error('请输入5-15位字母数字密码'));
      }else{
        if(this.changePinPassword.pswTwo !=''){
          this.$refs.changePinPsd.validateField('pswTwo');
        }
        callback();
      }
    };
    const validatePassCheck = (rule,value,callback)=>{
      if (!value) {
          return callback(new Error('请再次输入密码'));
      } else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,15}$/.test(value)){
        return callback(new Error('请输入5-15位字母数字密码'));
      } else if(value != this.changePinPassword.psw) {
          return callback(new Error(this.$t('message.accountSet.TwoPsdInconsistent')));
      } else {
          callback();
      }
    };
    const validatPassPin = (rule,value,callback)=>{

      if (!value) {
          callback(new Error(this.$t('message.accountSet.PleaseEnterNewPsw')));
      }else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,15}$/.test(value)){
        return callback(new Error('请输入5-15位字母数字密码'));
      }else{
        if(this.changeLoginPasswords.newpswagain !=''){
          this.$refs.changeLoginPsd.validateField('newpswagain');
        }
        callback();
      }
    };
    const validatPassOld = (rule,value,callback)=>{
      if (!value) {
        callback(new Error('输入原始登录密码'));
      }else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,15}$/.test(value)){
        return callback(new Error('请输入5-15位字母数字密码'));
      }else{
        callback();
      }
    }
    const validatePassCheckPin = (rule,value,callback)=>{
      if (!value) {
          return callback(new Error('请再次输入密码'));
      } else if(value != this.changeLoginPasswords.newpsw) {
          return callback(new Error(this.$t('message.accountSet.TwoPsdInconsistent')));
      } else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,15}$/.test(value)){
          return callback(new Error('请输入5-15位字母数字密码'));
      } else {
        callback();
      }
    };
    const validateipAddress = (rule,value,callback)=>{
      if(value!=""){
        if(/^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/.test(value)){
          callback();
        }else{
          return callback(new Error('请输入正确的IP地址'));
        }
      }else{
        callback();
      }
    }
    const validateidCard = (rule,value,callback)=>{
      if(!value){
        return callback(new Error('请输入你的证件号码'))
      }else if( this.IDtype == "1"){
        if(/^[A-Za-z0-9]{4,20}$/.test(value)){
          callback();
        }else{
          return callback(new Error('请输入正确的护照'));
        }
      }else if( this.IDtype == "2"){
        if(value.length==18){
          if(this.IdentityCodeValid(value)){
            callback();
          }else{
            return callback(new Error('请输入正确的证件号码'))
          }
        }else{
          return callback(new Error('请输入正确的证件号码'))
        }
      }
    }
    const validateipTips = (rule,value,callback)=>{
      if(!value){
        callback();
      }else{
        if(value.length > 40){
          return callback(new Error('最大长度为40位'));
        }else{
          callback();
        }
      }
    }
    const codePass = (rule,value,callback)=>{
      if(!value){
        return callback(new Error('请输入验证码'));
      }else{
        if(/^[0-9]+$/.test(value)){
          callback();
        }else{
          return callback(new Error('请输入正确的数字验证码'))
        }
      }
    }
  	return{
      //账号的信息111
      accountBigDatas:{},
      search: '',
      //性别
      sexDatas:{
        male:"1"
      },
      //简介
      briefIntroDatas:{
        data:''
      },
      briefIntroRules:{
        data:[{required: true,message: '请输入',trigger:'blur'}]
      },
      //生日的年月日
      birthDatas:{
        yearNum:'',
        monthNum:'',
        dayNum:''
      },
      birthRules:{
        yearNum:[{required: true,message: '请选择',trigger:'change'}],
        monthNum:[{required: true,message: '请选择',trigger:'change'}],
        dayNum:[{required: true,message: '请选择',trigger:'change'}]
      },
      //验证手机号去修改手机
      formTop:{
        input1:""
      },
      testPhoneRules:{
        input1:[
          {required: true, validator:validatePhonenumber,trigger:'blur'}
        ]
      },
      //设置修改资金密码
      changePinPassword:{
        psw:"",
        pswTwo:""
      },
      changePinPsdRules:{
        psw:[
          {required: true,validator:validatPass,trigger:'blur'}
        ],
        pswTwo:[
          {required: true,validator:validatePassCheck,trigger:'blur'}
        ]
      }, 
      //修改登录密码
      changeLoginPasswords:{
        oldpsw:'',
        newpsw:'',
        newpswagain:''
      },
      changeLoginPsdRules:{
        oldpsw:[{required: true,validator: validatPassOld,trigger:'blur'}],
        newpsw:[{required: true,validator: validatPassPin,trigger:'blur'}],
        newpswagain:[{required: true,validator:validatePassCheckPin,trigger:'blur'}]
      },
      //api密钥note和ip
      secretKeydatas:{
        tips:'',
        ipAddress:''
      },
      secretKeyRules:{
        tips:[{max:50,validator: validateipTips,trigger: 'change'}],
        ipAddress:[{validator: validateipAddress,trigger: 'blur'}]
      },
      //google的验证信息
      googleTest:{
        testContent:''
      },
      googleRules:{
        testContent:[{validator:codePass,trigger:'blur'}]
      },
      //实名认证的name，idCard
      nameApprove:{
        name:'',
        idCard:''
      },
      nameApproveRules:{
        name:[
          {required:true,message: '请输入姓名',trigger:'blur'}
        ],
        idCard:[
          {validator: validateidCard,trigger: 'blur'}
        ]
      },
      //资金验证前的邮箱验证
      pinPasswordBefore:{
        pinAuthCode:''
      },
      pinPswBeforeRules:{
        pinAuthCode:[{required:true,message: '请输入验证码',trigger:'blur'}]
      },
      //修改设置的手机号码
      phoneNumChange:{
        model9:'+86',
        numberPhone:'',
        numberAuthCode:''
      },
      phoneNumChangeRules:{
        model9:[{required:true,message:'请选择',trigger:'click'}],
        numberPhone:[{validator:validatePhonenumber,trigger: 'blur'}],
        numberAuthCode:[{validator:codePass,trigger:'blur'}]
      },
      //二次验证的验证数据
      twiceTestDatas:{
        twiceTestSelect:"",
        secondCode:""
      },
      twiceTestRules:{
        twiceTestSelect:[{required:true,message: '请选择',trigger:'change'}],
        secondCode:[{validator:codePass,trigger:'blur'}]
      },
      //二次验证后的switch数据
      threeTestDatas:{
        secondCode:""
      },
      threeTestRules:{
        secondCode:[{validator:codePass,trigger:'blur'}]
      },
      //绑定邮箱的数据
      emailBindData:{
        emailNum:"",
        emailCode:""
      },
      emailBindDataRules:{
        emailNum:[{required: true, message: '请输入邮箱账号', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱账号', trigger: 'blur'}],
        emailCode:[{validator:codePass,trigger:'blur'}]
      },
      // 高级认证中上传图片的3个file和3个src
      file:'',
      file2:'',
      file3:'',
      src:'',
      src2:'',
      src3:'',
  		huiWai:false,
  		tanVariable:"",
  		googleTestShow:false,
  		editgoogleTestShow: false,
  		centeredShow:false,
  		loginPassword:false,
  		verifyPhoneNumber:false,
  		changePhoneNumber:false,
  		fundPasswordSafe:false,
  		ResetfundPassword:false,
  		realNameApprove:false,
  		advancedVerify:false,
      comfirmDelete:false,
      setBirthday:false,
      briefIntro:false,
      setSex:false,
      changeAvatar:false,
      middleJump:false,
      twoVerificationJudge:false,
      threeVerificationTest:false,
      bindEmail:false,
      canNotVerify:false,
  		// model9: '',
      yearList: [
      ],
      monthsList: [
      ],
      daysList: [
      ],
      yearNum:'',
      monthNum:'',
      dayNum:'',
  		areaPhoneNumBefores:[
		  ],
      //得到的手机号和国际码
		  shoujihao:"",
      internationalCode:"",
		  // google的验证信息
		  googleQrMessage:{},
      // 高级认证的设定和修改,true为设定高级认证，false为修改高级认证
      advancedVerifySetOrChange:true,
		  // 绑定手机号和修改手机号的值,true为绑定手机号，flase为修改手机号
		  bindOrChangePhone:true,
		  // 修改api和新建api的值,修改api为true,新建API为false
		  modifyOrNewApi:true,
      // 绑定资金密码或者重置资金密码，修改为false，绑定为true
      bindOrchangePin:false,
      // 普通认证的设置和修改 修改位false，绑定位true
      realApproveSetOrChang:false,
		  // 实名认证中的身份类型的下拉框
		  cityList: [
            {
                value: '1',
                label: '护照'
            },
            {
                value: '2',
                label: '二代身份证'
            }
        ],
      secondOrderSelect:[
      ],

      // 实名认证中的真名和证件号码
      IDtype: '1',
      // 手机发送验证码的key
      phone_key:'',
      //倒计时的时间
      count:60,
      countEmail:60,
       //二次验证开启关闭的倒计时
      countVerifyP:60,
      countVerifyE:60,
      //邮箱手机验证
      loadingCode:false,
      loadingCodeEmail:false,
      //二次验证开启关闭的发送验证码
      loadingCodeTestp:false,
      loadingCodeTeste:false,
      //登录密码时渲染的邮箱
      fundPasswordSafeEmail:"",
      //存放Email的key
      email_key:"",
      //存放头像file
      fileAvatar:"",
      srcAvatar:"",
      acceptData:{},
      apiID:"",
      //计时器
      timerPhone:null,
      timeEmail:null,
      //文件上传
      fileLoading:false,
      cancelDisable:false,
      //二次验证的两个key
      twoTestEmailKey:"",
      twoTestPhoneKey:"",
      //二次验证的计时器
      twiceTestTimerE:null,
      twiceTestTimerP:null,
      urlArr:{a:"",b:"",c:""},
      twiceTestBeforeStatus:"",
      whichTest:"",
      whichTestThreeSelect:"",
      timerOut:null,
      safeAfteTiaoWho:"",
      emailCode:0,
      phoneCode:0,
      googleCode:0,
      //绑定邮箱时候的key存放
      emailBindKey:"",
      //绑定邮箱
      loadingCodeLastEmail:false,
      countLastEmail:60,
      timerLastEmail:null,
      kaiQi:"kaiQi",
      guanBi:"guanBi",
      juluOldYear:"",
      juluOldMonth:"",
      juluOldDate:"",
      nationalFlag:true,
      twoVerifyLoading: false,  // 二次验证是否开启 确定
			threeVerifyLoading: false,
			bindGoogleLoading: false,  // 绑定谷歌验证器
    }
  },
  props:{
  	Tanone:{
  		type:String,
  		default:''
  	},
    popoverData:{
      type:Object,
      default:{}
    }
  },
  mounted(){

  },
  methods:{
    clearSearch (val) {
      if (!val) this.search = ''
    },
    //绑定手机的国际吗的点击事件
    langOperate(value){
        // this.nationalFlag = false;
        this.phoneNumChange.model9 = value;
        this.$refs.phoneNumChangeData.validateField('model9');
    },
    //身份证的校验规则
    IdentityCodeValid:function(code){
      var city = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
      var pass = true;
        if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d{1}|X)?$/i.test(code)){
            pass = false;
        }else if(!city[code.substr(0,2)]){
            pass = false;
        }else{
        //18位身份证需要验证最后一位校验位
          if(code.length == 18){
              code = code.split('');
              //∑(ai×Wi)(mod 11)
              //加权因子
              var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
              //校验位
              var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
              var sum = 0;
              var ai = 0;
              var wi = 0;
              for (var i = 0; i < 17; i++)
              {
                  ai = code[i];
                  wi = factor[i];
                  sum += ai * wi;
              }
              var last = parity[sum % 11];
              if(parity[sum % 11] != code[17]){
                  pass = false;
              }
          }
        }
      return pass;
    },
    //点击取消和X关闭窗口
    cancelClose(name){
      //关闭所有小的弹窗
      this.googleTestShow = false;
      this.editgoogleTestShow = false
      this.centeredShow = false;
      this.loginPassword = false;
      this.verifyPhoneNumber = false;
      this.changePhoneNumber = false;
      this.fundPasswordSafe = false;
      this.ResetfundPassword = false;
      this.realNameApprove = false;
      this.advancedVerify = false;
      this.comfirmDelete = false;
      this.setBirthday = false;
      this.briefIntro = false;
      this.setSex = false;
      this.changeAvatar = false;
      this.middleJump = false;
      this.twoVerificationJudge = false;
      this.threeVerificationTest = false;
      this.bindEmail = false ;
      this.canNotVerify = false;
      this.nationalFlag =true;
      //关闭大的灰框
      this.$emit('cancelClose',this.huiWai);
      //清空弹窗中之前填写的input数据
      this.file = '';
      this.file2='';
      this.file3='';
      this.src='';
      this.src2='';
      this.src3='';
      this.fileAvatar="";
      this.srcAvatar="";
      this.secondOrderSelect = [];
      this.loadingCode = false;
      this.loadingCodeEmail = false;
      this.loadingCodeTestp = false;
      this.loadingCodeTeste = false;
      //上传图片的
      this.fileLoading = false;
      this.cancelDisable = false;
      this.twoVerifyLoading = false
      this.threeVerifyLoading = false
      this.bindGoogleLoading = false
      if(name){
        this.$refs[name].resetFields();
      }
    },
    //点击确定关闭弹窗
    closePopover(name){
      //关闭所有小的弹窗
      this.googleTestShow = false;
      this.editgoogleTestShow = false
      this.centeredShow = false;
      this.loginPassword = false;
      this.verifyPhoneNumber = false;
      this.changePhoneNumber = false;
      this.fundPasswordSafe = false;
      this.ResetfundPassword = false;
      this.realNameApprove = false;
      this.advancedVerify = false;
      this.comfirmDelete = false;
      this.setBirthday = false;
      this.briefIntro = false;
      this.setSex = false;
      this.changeAvatar = false;
      this.middleJump = false;
      this.twoVerificationJudge = false;
      this.threeVerificationTest = false;
      this.bindEmail = false;
      this.canNotVerify = false;
      this.nationalFlag =true;
      //关闭大的灰框
      this.$emit('closepopover',this.huiWai);
      //清空弹窗中之前填写的input数据
      this.file = '';
      this.file2='';
      this.file3='';
      this.src='';
      this.src2='';
      this.src3='';
      this.fileAvatar="";
      this.srcAvatar="";
      this.secondOrderSelect = [];
      this.loadingCode = false;
      this.loadingCodeEmail = false;
      this.loadingCodeTestp = false;
      this.loadingCodeTeste = false;
      this.count = 60;
      clearInterval(this.timerPhone);
      this.timerPhone = null;
      //重置计时器的
      clearInterval(this.twiceTestTimerP);
      clearInterval(this.twiceTestTimerE);
      this.twiceTestTimerE = null;
      this.twiceTestTimerP = null;
      this.countVerifyP = 60;
      this.countVerifyE = 60;
      this.loadingCodeTeste = false;
      this.loadingCodeTestp = false;
      //上传图片的
      this.fileLoading = false;
      this.cancelDisable = false;
      this.loadingCodeLastEmail = false;
      this.countLastEmail = 60;
      this.twoVerifyLoading = false
      this.threeVerifyLoading = false
      this.bindGoogleLoading = false
      clearInterval(this.timerLastEmail);
      this.timerLastEmail = null;
      if(name){
        this.$refs[name].resetFields();
      }
    },
    //绑定邮箱发送邮件验证码
    bindEamilNumberSend(name){
       this.$refs[name].validateField('emailNum');
       if( this.emailBindData.emailNum ){
          if(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.emailBindData.emailNum)){
            let datass = {
              email:this.emailBindData.emailNum
            }
            this.loadingCodeLastEmail = true;
            api.accountBindEmail(datass).then(res=>{
//            console.log(res);
                if(res.status_code==200){
//                  console.log(res);
                    this.timerLastEmail = setInterval(() => {
                      if (this.countLastEmail > 0){
                        this.countLastEmail--;
                        if(this.countLastEmail==59){
                          this.loadingCodeLastEmail = false;
                        }
                      } else {
                        clearInterval(this.timerLastEmail);
                        this.countLastEmail = 60;
                      }
                    },1000);
                    this.emailBindKey = res.data.email_key;
                    this.$Message.success('发送成功，请稍候');



                } else{
                  this.loadingCodeLastEmail = false;
                  this.countLastEmail = 60;
                  clearInterval(this.timerLastEmail);
                }
            }).catch(error=>{
              this.loadingCodeLastEmail = false;
              this.countLastEmail = 60;
              clearInterval(this.timerLastEmail);

            })
          }
       }
    },
    //绑定邮箱(点击确定)
    bindEamilNumberTest(name){
      this.$refs[name].validate((valid)=>{
        if(valid){
          //先验证码。再校验
          if(this.emailBindKey){

            let params = {
              email:this.emailBindData.emailNum,
              email_key:this.emailBindKey,
              email_code:this.emailBindData.emailCode
            }
            api.accountBindEmailTest(params).then(res=>{
//            console.log(res);
              if(res.status_code == 200){
                this.$Message.success('操作成功');
                this.loadingCodeTeste = false;
                this.loadingCodeTestp = false;
                this.closePopover(name);
              }else if( res.status_code ==6001 ){
                this.loadingCodeLastEmail = false;
                clearInterval(this.timerLastEmail);
                this.countLastEmail = 60;
                this.emailBindKey = "";
                this.bindEmail = false;
                this.$refs[name].resetFields();
                this.emailCode = 0;
                this.phoneCode = 0,
                this.googleCode = 0,
                this.secondOrderSelect = [];
                if(res.data.email == "email"){
                this.emailCode = 1;
                }
                if(res.data.phone == "phone"){
                  this.phoneCode = 1;
                }
                if(res.data.google == "google"){
                  this.googleCode = 1;
                }
                this.waysafeRight();
                this.twiceTestBeforeStatus = "createEmail";
                this.twoVerificationJudge = true;

              }else{
                this.loadingCodeLastEmail = false;
                this.countLastEmail = 60;
                clearInterval(this.timerLastEmail);
                this.timerLastEmail = null;
              }

            })

          }else{
            this.$Message.info('请获取验证码');
          }

        }
      })
    },
    //修改二次验证的状态的按钮
    threeWhichSure(name){
      this.$refs[name].validate((valid)=>{
        if(valid){
					this.threeVerifyLoading = true
          if(this.whichTest == 1){
            //shouji
            if( this.twoTestPhoneKey ){

              let params = {
                verification_code:this.threeTestDatas.secondCode,
                verification_key:this.twoTestPhoneKey
              }
              api.twicePhoneTestAgain(params).then(res=>{
                if(res.status_code==200){
                  this.twoTestPhoneKey = "";
                  let params = {
                    status:"phone"
                  }
                  api.closeOpenTwiceVerigy(params).then(res=>{
                    if(res.status_code == 200){
                      this.$Message.success('操作成功');
                      this.loadingCodeTeste = false;
                  		this.loadingCodeTestp = false;
                  		this.threeVerifyLoading = false
                      this.closePopover(name);
                    }else if(res.status_code == 6001){
                    	this.threeVerificationTest = false
                    	this.threeVerifyLoading = false
                      if(res.data.email == "email"){
                      	this.threeVerifyLoading = false
                        this.emailCode = 1;
                      }
                      if(res.data.phone == "phone"){
                      	this.threeVerifyLoading = false
                        this.phoneCode = 1;
                      }
                      if(res.data.google == "google"){
                      	this.threeVerifyLoading = false
                        this.googleCode = 1;
                      }
                      this.waysafeRight();
                      this.twiceTestBeforeStatus = "phone";
                      this.twoVerificationJudge = true;
                    }else {
                    	this.threeVerifyLoading = false
                    }
                  }).catch(err => {
                  	this.threeVerifyLoading = false
                  })
                } else{
									this.threeVerifyLoading = false
                }

              }).catch(err=> {
              	this.threeVerifyLoading = false
              })


            }else{
            	console.log('验证码hhhh')
            	this.threeVerifyLoading = false
              this.$Message.info('请获取验证码');
            }

          }else if(this.whichTest == 2){
            //youjian
            if( this.twoTestEmailKey ){
							this.threeVerifyLoading = true
              let params = {
                email_code:this.threeTestDatas.secondCode,
                email_key:this.twoTestEmailKey
              }
              api.twiceEmailTestAgain(params).then(res=>{
                if(res.status_code == 200){
                  this.twoTestEmailKey = "";
                  let params = {
                    status:"email"
                  }
                  api.closeOpenTwiceVerigy(params).then(res=>{
                    if(res.status_code == 200){
                    	this.threeVerifyLoading = false
                      this.$Message.success('操作成功');
                      this.loadingCodeTeste = false;
                  		this.loadingCodeTestp = false;
                      this.closePopover(name);
                    }else if(res.status_code == 6001){
                    	this.threeVerifyLoading = false
                    	this.threeVerificationTest = false
                      if(res.data.email == "email"){
                        this.emailCode = 1;
                      }
                      if(res.data.phone == "phone"){
                        this.phoneCode = 1;
                      }
                      if(res.data.google == "google"){
                        this.googleCode = 1;
                      }
                      this.waysafeRight();
                      this.twiceTestBeforeStatus = "email";
                      this.twoVerificationJudge = true;
                    }else {
                    	this.threeVerifyLoading = false
                    }
                  })
                } else{
									this.threeVerifyLoading = false
                }
              })


            }else{
            	this.threeVerifyLoading = false
              this.$Message.error('请获取验证码');
            }

          }else if(this.whichTest == 3){
            //google
            let params = {
              verify:this.threeTestDatas.secondCode
            }
//          console.log(params);
            api.twiceGoogleTestAgain(params).then(res=>{
              if(res.status_code == 200){
                let params = {
                  status:"google"
                }
                api.closeOpenTwiceVerigy(params).then(res=>{
                	this.threeVerificationTest = false
                  if(res.status_code == 200){
                  	this.threeVerifyLoading = false
                    this.$Message.success('操作成功！');
                    this.closePopover(name);
                  }else if(res.status_code == 6001){
                  	this.threeVerifyLoading = false
                    if(res.data.email == "email"){
                      this.emailCode = 1;
                    }
                    if(res.data.phone == "phone"){
                      this.phoneCode = 1;
                    }
                    if(res.data.google == "google"){
                      this.googleCode = 1;
                    }
                    this.waysafeRight();
                    this.twiceTestBeforeStatus = "google";
                    this.twoVerificationJudge = true;
                  }else {
                  	this.threeVerifyLoading = false
                  }
                }).catch(err=> {
                	this.threeVerifyLoading = false
                })
              } else{
              	this.threeVerifyLoading = false
              }
            })
          }
        }
      })
    },
    //二次验证的手机发送验证码
    twiceTestSendPhone(){
//    console.log("手机")
      this.loadingCodeTestp = true;
      api.twiceTestPhoneSend().then(res=>{
        if(res.status_code == 200){
//        console.log(res);
          this.twoTestPhoneKey = res.data.verification_key;
//        console.log(this.twoTestPhoneKey);
          this.twiceTestTimerP = setInterval(() => {
            if (this.countVerifyP > 0){
              this.countVerifyP--;
              if(this.countVerifyP==59){
                this.loadingCodeTestp = false;
                this.loadingCodeTeste = false;
              }
            } else {
              clearInterval(this.twiceTestTimerP);
              this.countVerifyP = 60;
            }
          },1000);
          this.$Message.success('发送成功，请稍候');
        }else{
          this.loadingCodeTestp = false;
        }

      }).catch(error=>{
        this.loadingCodeTestp = false;
      })
    },
    //二次验证的邮箱发送验证码
    twiceTestSendEmail(){
//    console.log("邮件")
      this.loadingCodeTeste = true;
      api.sendEmail().then(res=>{
        if(res.status_code == 200){
          this.twiceTestTimerE = setInterval(() => {
            if (this.countVerifyE > 0){
              this.countVerifyE--;
              if(this.countVerifyE==59){
                this.loadingCodeTeste = false;
              }
            } else {
              clearInterval(this.twiceTestTimerE);
              this.countVerifyE = 60;
            }
          },1000);

          this.twoTestEmailKey = res.data.email_key;
          this.$Message.success('发送成功，请稍候');
        }else{
          this.loadingCodeTeste = false;
        }

      }).catch(error=>{
        this.loadingCodeTeste = false;
      })
    },
    //二次验证的开启关闭的验证的按钮
    twiceTestOpenClose(name){
      this.$refs[name].validate((valid)=>{
        if(valid){
        	this.twoVerifyLoading = true
          if(this.twiceTestDatas.twiceTestSelect == "1"){  // 邮箱
            let params = {
              status:this.twiceTestBeforeStatus,
              email_code:this.twiceTestDatas.secondCode,
              email_key:this.twoTestEmailKey
            }
            if( this.twoTestEmailKey ){
              api.twiceEmailTest(params).then(res=>{
                if(res.status_code==200){
                	this.twoVerifyLoading = false
                  this.$Message.success('操作成功！');
                  this.twoTestEmailKey = "";
                  clearInterval(this.twiceTestTimerP);
                  clearInterval(this.twiceTestTimerE);
                  this.twiceTestTimerE = null;
                  this.twiceTestTimerP = null;
                  this.countVerifyP = 60;
                  this.countVerifyE = 60;
                  this.loadingCodeTeste = false;
                  this.loadingCodeTestp = false;

                  this.twoVerificationJudge = false;
                  this.$refs[name].resetFields('twiceTestDatasRef');
                  this.safeAfteTiaoWho = res.data.status;

                } else{
                	this.twoVerifyLoading = false
                }
              }).catch(err => {
								this.twoVerifyLoading = false;
							})
            }else{
            	this.twoVerifyLoading = false;
              this.$Message.info('请获取验证码');
            }
          }else if(this.twiceTestDatas.twiceTestSelect == "2"){  // 手机
            if( this.twoTestPhoneKey ){
              let params = {
                status:this.twiceTestBeforeStatus,
                verification_code:this.twiceTestDatas.secondCode,
                verification_key:this.twoTestPhoneKey
              }
              api.twicePhoneTest(params).then(res=>{

                if(res.status_code==200){
                	this.twoVerifyLoading = true
                  this.twoTestPhoneKey = "";
                  this.$Message.success('操作成功');
                  clearInterval(this.twiceTestTimerP);
                  clearInterval(this.twiceTestTimerE);
                  this.twiceTestTimerE = null;
                  this.twiceTestTimerP = null;
                  this.countVerifyP = 60;
                  this.countVerifyE = 60;
                  this.loadingCodeTeste = false;
                  this.loadingCodeTestp = false;

                  this.twoVerificationJudge = false;
                  this.$refs[name].resetFields('twiceTestDatasRef');

                  this.safeAfteTiaoWho = res.data.status;

                } else{
                	this.twoVerifyLoading = false;
                }
              }).catch(err =>{
              	this.twoVerifyLoading = false;
              })
            }else{
            	this.twoVerifyLoading = false;
              this.$Message.info('请获取验证码');
            }
          }else if(this.twiceTestDatas.twiceTestSelect == "3"){  // 谷歌
            let params = {
              status:this.twiceTestBeforeStatus,
              verify:this.twiceTestDatas.secondCode
            }
            api.twiceGoogleTest(params).then(res=>{
              if(res.status_code==200){
              	this.twoVerifyLoading = true;
                this.$Message.success('操作成功！');
                clearInterval(this.twiceTestTimerP);
                clearInterval(this.twiceTestTimerE);
                this.twiceTestTimerE = null;
                this.twiceTestTimerP = null;
                this.countVerifyP = 60;
                this.countVerifyE = 60;
                this.loadingCodeTeste = false;
                this.loadingCodeTestp = false;

                this.twoVerificationJudge = false;
                this.$refs[name].resetFields('twiceTestDatasRef');
                this.safeAfteTiaoWho = res.data.status;

              } else{
              	this.twoVerifyLoading = false;
              }
            }).catch(err =>{
            	this.twoVerifyLoading = false;
            })
          }
        }
      })
    },
    //当还没实名认证时，高级认证的跳转
    jumpApprove(){
      this.middleJump = false;
      this.realNameApprove = true;
      this.realApproveSetOrChang =true;
    },
    //上传头像显示到弹窗中
    changeAvatars(ev){
      let windowURL = window.URL || window.webkitURL;
      let oldFileAvatar = this.fileAvatar;
      this.fileAvatar = ev.target.files[0];
      ev.target.value = "";
//    console.log(this.fileAvatar.size);
      if( (this.fileAvatar.size/1024/1024) > 1 ){
        this.fileAvatar = oldFileAvatar;
        this.$Message.info("文件大小不能超过1M");
//      console.log(this.fileAvatar);
      }else{
//      console.log(this.fileAvatar);
        this.srcAvatar = windowURL.createObjectURL(this.fileAvatar);
      }

    },
    //把头像给后台
    submitAvatars(){
      if( this.fileAvatar == ""){
        this.$Message.info("请上传新头像");
      }else{
        let instances = axios.create();
        instances.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        instances.defaults.headers['Authorization'] = 'Bearer' + utils.getCookie('token');
        instances.defaults.timeout = 60000;

        let data = new FormData();
        data.append('file',this.fileAvatar);
        data.append('dir',"Avatar")
        const domain = window.location.origin;
        if (domain.indexOf('localhost') == -1) {
          instances.defaults.baseURL = resOnline.a;
        }else {
          instances.defaults.baseURL = config.a;
        }
        this.fileLoading = true;
        this.cancelDisable = true;
        instances.post('file',data).then(res=>{
//        console.log(res)
          instances.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            if(res.data.file_path){
              const domain = window.location.origin;
              let fileUrlBefore= "";
              if (domain.indexOf('localhost') == -1) {
                fileUrlBefore = resOnline.fileUrl;
              }else {
                fileUrlBefore = config.fileUrl;
              }
//            console.log(res.data.file_path,'传头像');
              let url = fileUrlBefore+res.data.file_path;
              let datas = {user_avatar:url};

              api.changeBasicData(datas).then(res=>{

                if(res.status_code == 200){

                  this.$Message.success('操作成功！');
                  this.fileLoading = false;
                  this.cancelDisable = false;
                  this.$emit('datasReturn',datas);
                  this.cancelClose(name);
                }else{
                  this.fileLoading = false;
                  this.cancelDisable = false;

                }

              }).catch(error=>{
                this.$Message.error('上传失败');
                this.fileLoading = false;
                this.cancelDisable = false;
              })
            } else if(res.data.status_code == 5010){
              this.fileLoading = false;
              this.cancelDisable = false;
            } else {
              this.$Message.error('上传失败');
              this.fileLoading = false;
              this.cancelDisable = false;
            }
        }).catch(error=>{
          this.fileLoading = false;
          this.cancelDisable = false;
          this.$Message.error('上传失败');
          instances.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


        })
      }
    },
    //设置性别的btn
    sexBtn(ev){
      let params = {
        user_gender:this.sexDatas.male
      }
      api.changeBasicData(params).then(res=>{
        if(res.status_code ==200){
          this.$Message.success('操作成功！');

          let datas = {user_gender:this.sexDatas.male};

          this.$emit('datasReturn',datas)
          this.cancelClose(name);
        }
      })
    },
    //设置简介的btn
    briefBtn(name){
      this.$refs[name].validate((valid)=>{
        if(valid){
          let params = {
            user_brief:this.briefIntroDatas.data
          }
          api.changeBasicData(params).then(res=>{
            if(res.status_code ==200){
              this.$Message.success('操作成功！');
              let datas = {user_brief:this.briefIntroDatas.data};
              this.$emit('datasReturn',datas)
              this.cancelClose(name);
            }
          })
        }
      })
    },
    //设置生日的btn
    submitBirth(name){
      this.$refs[name].validate((valid)=>{
        if(valid){
          let birthday = `${this.birthDatas.yearNum}-${this.birthDatas.monthNum>9?this.birthDatas.monthNum:"0"+this.birthDatas.monthNum}-${this.birthDatas.dayNum>9?this.birthDatas.dayNum:"0"+this.birthDatas.dayNum}`;
          let datas = {
            user_birthday:birthday
          }
          api.changeBasicData(datas).then(res=>{
            if(res.status_code ==200){
              this.$Message.success('操作成功！');
              let datas = {user_birthday:birthday}
              this.$emit('datasReturn',datas)
              this.cancelClose(name);
            }
          })
        }
      })
    },
    //生日的下拉框下拉致高度的变化
    //年份变化重置月份日子变1;
    callOpen1(data){
      if(data){
        this.$refs['dateSelect'].style.height = 140+'px';
      }else{
        if(this.birthDatas.yearNum != this.juluOldYear){
          this.birthDatas.monthNum = "1";
          this.birthDatas.dayNum = "1";
        }
        this.$refs['dateSelect'].style.height = 40+'px';
      }
    },
    //月份变化重置日子为1号
    callOpen2(data){
      if(data){
        this.$refs['dateSelect'].style.height = 140+'px';
      }else{
        if (this.birthDatas.monthNum != this.juluOldMonth) {
          this.birthDatas.dayNum = "1";
        }
        this.$refs['dateSelect'].style.height = 40+'px';
      }
    },
    callOpen3(data){
      if(data){
        this.$refs['dateSelect'].style.height = 140+'px';
      }else{
        this.$refs['dateSelect'].style.height = 40+'px';
      }
    },
    //二次验证select的高度变化
    testSelectHeight(data){
      if(data){
        if(this.secondOrderSelect.length.length == 1){
          this.$refs['twiceTestHeightChange'].style.height = 106+"px";
        }else if(this.secondOrderSelect.length == 2){
          this.$refs['twiceTestHeightChange'].style.height = 136+"px";
        }else if(this.secondOrderSelect.length == 3){
          this.$refs['twiceTestHeightChange'].style.height = 166+"px";
        }
      }else{
        this.$refs['twiceTestHeightChange'].style.height = 64+"px";
      }
    },
    //修改交易密码的验证
    //1.渲染邮箱号上去2.无需邮箱号发送验证码,3.再验证key和邮箱验证码,才能跳转)
    //1.得到邮箱号
    getEmailTexts(){
      api.getEmailText().then(res=>{
        if(res.status_code == 200){
          this.fundPasswordSafeEmail = res.data.email;
        }
      })
    },
    //2.点击发送验证码和设置key的值
    resetdealPasswordGetCode(){

      //得到邮箱验证码
//    console.log(this.fundPasswordSafeEmail);
      if( this.fundPasswordSafeEmail ){
        this.loadingCodeEmail = true;
        api.sendEmail().then(res=>{
          if(res.status_code == 200){
//          console.log(res);
            this.timerEmail = setInterval(() => {
              if (this.countEmail > 0){
                this.countEmail--;
                if(this.countEmail==59){
                  this.loadingCodeEmail = false;
                }
              } else {
                clearInterval(this.timerEmail);
                this.countEmail = 60;
                this.loadingCodeEmail = false;
              }
            },1000);
            this.email_key = res.data.email_key;
            this.$Message.success('发送成功，请稍候');
          }else if(res.status_code == 5006){

            this.loadingCodeEmail = false;
            clearInterval(this.timerEmail);
            this.countEmail = 60;

          }else{
            this.loadingCodeEmail = false;
            clearInterval(this.timerEmail);
            this.countEmail = 60;

          }
        }).catch(error=>{
          this.loadingCodeEmail = false;
          clearInterval(this.timerEmail);
          this.countEmail = 60;
        })
      }else{
//      console.log("1515");
        this.loadingEmail = false;
        clearInterval(this.timerEmail);
        this.countEmail = 60;
      }
    },
    //3.再验证key和邮箱验证码,才能跳转
  	newFundPasswordNext (name){
      //验证邮箱验证码和key判断是否跳转
      this.$refs[name].validate((valid)=>{
        if(valid){
//        console.log(this.email_key,this.pinPasswordBefore.pinAuthCode)
          if( this.email_key){
            let datas ={
              email_key:this.email_key,
              email_code:this.pinPasswordBefore.pinAuthCode
            }
            api.changePinTest(datas).then(res=>{
              if(res.status_code == 200){
                this.fundPasswordSafe = false;
                this.ResetfundPassword = true;
                this.$refs[name].resetFields(name);
                this.$Message.success('验证通过');
                this.email_key = "";
              }
            })
          }else{
            this.$Message.info('请获取验证码');
          }
        }
      })
  	},
    //修改交易密码提交数据给后台
    changeDealPassword(name){
      this.$refs[name].validate((valid)=>{
        if(valid){
          let data = {
            pin:this.changePinPassword.psw,
            pin_confirmation:this.changePinPassword.pswTwo
          }
          api.changeDealPassword(data).then(res=>{
            if(res.status_code ==200){
              this.$Message.success('操作成功！');
              this.cancelClose(name);
            }else if(res.status_code == 6001){
              this.$refs[name].resetFields();
              this.ResetfundPassword = false;
              this.emailCode = 0;
              this.phoneCode = 0,
              this.googleCode = 0,
              this.secondOrderSelect = [];
              if(res.data.email == "email"){
                  this.emailCode = 1;
              }
              if(res.data.phone == "phone"){
                this.phoneCode = 1;
              }
              if(res.data.google == "google"){
                this.googleCode = 1;
              }
              this.waysafeRight();
              this.twiceTestBeforeStatus = "updatePin";
              this.twoVerificationJudge = true;
            }
          })
        }
      })
    },
    //设置交易密码提交数据给后台
    setDealPassword(name){
      this.$refs[name].validate((valid)=>{
        if(valid){
          let data = {
            pin:this.changePinPassword.psw,
            pin_confirmation:this.changePinPassword.pswTwo
          }
          api.setDealPassword(data).then(res=>{
            if(res.status_code ==200){
              this.$Message.success('操作成功！');
              this.closePopover(name);
            }else if(res.status_code == 6001){
              this.$refs[name].resetFields();
              this.ResetfundPassword = false;
              this.emailCode = 0;
              this.phoneCode = 0,
              this.googleCode = 0,
              this.secondOrderSelect = [];
              if(res.data.email == "email"){
                  this.emailCode = 1;
              }
              if(res.data.phone == "phone"){
                this.phoneCode = 1;
              }
              if(res.data.google == "google"){
                this.googleCode = 1;
              }
              this.waysafeRight();
              this.twiceTestBeforeStatus = "createPin";
              this.twoVerificationJudge = true;
            }
          })
        }
      })
    },
    //关闭api后刷新api列表
    apiClose(name){
      this.centeredShow  = false;
      this.comfirmDelete = false;
      let apiGuanbi ="apiGuanbi"
      this.$emit('closepopover',apiGuanbi);
      if(name){
        this.$refs[name].resetFields();
      }

    },
    // api新建密钥
  	newAKey (name){
      this.$refs[name].validate((valid)=>{
        if(valid){
          let secretKeydata = {
            ip:this.secretKeydatas.ipAddress,
            note:this.secretKeydatas.tips
          };
          api.createApi(secretKeydata).then(res=>{
            if(res.status_code == 200){
              this.$Message.success('操作成功！');
              this.apiClose(name);
            }else if(res.status_code == 5013){
              this.apiClose(name);
            }
          })

        }
      })
  	},
    // api 的修改
    changeAapi(data,name){
      this.$refs[name].validate((valid)=>{
        if(valid){
          let parms = {
            ip:this.secretKeydatas.ipAddress,
            note:this.secretKeydatas.tips,
            user_access_id:data
          }
          api.changeApi(parms).then(res=>{
            if(res.status_code == 200){
              this.apiClose(name);
              this.$Message.success('操作成功！');
            }
          })
        }
      })
    },
    //api的删除的确认
    delApiOne(data){
      let pams = {
            user_access_id:data
          }
      api.deleteApi(pams).then(res=>{
        if(res.status_code == 200){
          this.$Message.success('操作成功！');
          this.apiClose('apiData');
        }
      })
    },
    //google绑定里的key复制
  	copyCopy (){
  		// 谷歌验证器中的密钥复制
  		let Url2 = this.$refs.secretKeyCopy.innerText;
      let oInput = document.createElement('input');
      oInput.value = Url2;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = 'oInput';
      oInput.style.display='none';
      this.$Message.success('复制成功');
  	},
  	// 得到Google验证的信息二 维码图片等
  	getGoogleTestMessage(){
  		api.googleTestMessage().then(res=>{
  			if(res.status_code == 200 && res.data){
				  this.googleQrMessage = res.data;
//        console.log(this.googleQrMessage);
  			}
  		})
  	},
  	// 绑定Google，google验证
  	bindingGoogle(name){
      this.$refs[name].validate((valid)=>{
        if(valid){
        	this.bindGoogleLoading = true
          let params = {
            secret:this.googleQrMessage.secret,
            verify:this.googleTest.testContent
          }
          api.checkGoogleCode(params).then(res=>{
            if(res.status_code == 200){
            	this.bindGoogleLoading = false
              this.$Message.success('操作成功');
              let datas = {google_status:1}
              this.$emit('datasReturn',datas)
              this.cancelClose(name);
            } else if(res.status_code == 6001){
            	this.bindGoogleLoading = false
              this.googleTestShow = false;
              this.editgoogleTestShow = false
              this.$refs[name].resetFields();
              this.emailCode = 0;
              this.phoneCode = 0,
              this.googleCode = 0,
              this.secondOrderSelect = [];
              if(res.data.email == "email"){
                  this.emailCode = 1;
              }
              if(res.data.phone == "phone"){
                this.phoneCode = 1;
              }
              if(res.data.google == "google"){
                this.googleCode = 1;
              }
              this.waysafeRight();
              this.twiceTestBeforeStatus = "createGoogle";
              this.twoVerificationJudge = true;
            }else {
            	this.bindGoogleLoading = false
            }
          }).catch(err=> {
          	this.bindGoogleLoading = false
          })
        }
      })
  	},
    // 高级验证 把file获取到的图片显示页面中
    fileChange(ev,numb){
      // 通过file获取图片并显示
      let windowURL = window.URL || window.webkitURL;
      if (numb =="0") {

        let old_file = this.file;
        this.file = ev.target.files[0];
        ev.target.value = "";

        if ((this.file.size/1024/1024) > 5) {
          this.file = old_file;
          this.$Message.info('上传图片大小不能超过5M');
          return false;
        }

        if (this.file.size === this.file2.size || this.file.size === this.file3.size) {
          this.$Message.info('不要上传相同的图片');
          this.file = old_file;
          return false;
        }

        this.src = windowURL.createObjectURL(this.file);

      } else if(numb == "1") {

        let old_file2 = this.file2;
        this.file2 = ev.target.files[0];
        ev.target.value = "";

        if ((this.file2.size/1024/1024) > 5) {
          this.file2 = old_file2;
          this.$Message.info('上传图片大小不能超过5M');
          return false;
        }

        if (this.file2.size === this.file.size || this.file2.size === this.file3.size) {
          this.$Message.info('不要上传相同的图片');
          this.file2 = old_file2;
          return false;
        }

        this.src2 = windowURL.createObjectURL(this.file2);

      } else if(numb == "2") {

        let old_file3 = this.file3;
        this.file3 = ev.target.files[0];
        ev.target.value = "";

        if ((this.file3.size/1024/1024) > 5) {
          this.file3 = old_file3;
          this.$Message.info('上传图片大小不能超过5M');
          return false;
        }

        if (this.file3.size === this.file.size || this.file3.size === this.file2.size) {
          this.$Message.info('不要上传相同的图片');
          this.file3 = old_file3;
          return false;
        }

        this.src3 = windowURL.createObjectURL(this.file3);

      }
    },
    // 高级验证 把file获取的图片提交给后台
    submitPic(ev){
      if(this.file!="" && this.file2!="" & this.file3!=""){
        this.fileLoading = true;
        this.cancelDisable = true;
        let instance = axios.create();
        instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        instance.defaults.headers['Authorization'] = 'Bearer' + utils.getCookie('token');
        instance.defaults.timeout = 60000;

        const domain = window.location.origin;
        if (domain.indexOf('localhost') == -1) {
          instance.defaults.baseURL = resOnline.a;
        }else {
          instance.defaults.baseURL = config.a;
        }
        let fileArr= [this.file,this.file2,this.file3];
        // this.urlArr = [];
//      console.log(fileArr);
        const domai = window.location.origin;
        let beforeAdd= "";
        if (domai.indexOf('localhost') == -1) {
          beforeAdd = resOnline.fileUrl;
        }else {
          beforeAdd = config.fileUrl;
        }
        let data0 = new FormData();
        data0.append('file',fileArr[0]);
        data0.append('dir',"Avatar");
        let data1 = new FormData();
        data1.append('file',fileArr[1]);
        data1.append('dir',"Avatar");
        let data2 = new FormData();
        data2.append('file',fileArr[2]);
        data2.append('dir',"Avatar");
        for(let i=0;i<3;i++){

//        console.log(fileArr[i]);
          let data =null
          if(i==0){
             data = data0;
          }else if(i==1){
             data = data1;
          }else if(i==2){
             data = data2;
          }

          instance.post('file',data).then(res=>{
              if (res.data.file_path){
                let url = beforeAdd+res.data.file_path;
                if(i==0){
                  this.urlArr.a = url;
                }else if(i==1){
                  this.urlArr.b = url;
                }else if(i==2){
                  this.urlArr.c = url;
                }
                let sizeLength = 0;
                for(let key in this.urlArr){
                  if(this.urlArr[key] != ''){
                    sizeLength++
                  }
                }
                if(sizeLength==3){
                  if(this.urlArr.a!=""&&this.urlArr.b!=""&&this.urlArr.c!=""){
                    instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//                  console.log(this.urlArr);
                    let datasss={
                      identification_front_img:this.urlArr.a,
                      identification_reverse_img:this.urlArr.b,
                      identification_hand_img:this.urlArr.c
                    }
                    if(this.advancedVerifySetOrChange){
                      api.highApprove(datasss).then(res=>{
//                      console.log(res,"1514");
                        if(res.status_code==200){
                          this.urlArr = {a:"",b:"",c:""};
                          this.$Message.success('操作成功');
                          this.closePopover();
                          this.fileLoading = false;
                          this.cancelDisable = false;
                        }else{
//                        console.log("1649");
                          this.fileLoading = false;
                          this.cancelDisable = false;
                        }
                      })
                    }else{
                      api.changeHighApprove(datasss).then(res=>{
//                      console.log(res,"1525");
                        if(res.status_code == 200){
                          this.urlArr = {a:"",b:"",c:""};
                          this.$Message.success('操作成功');
                          this.closePopover();
                          this.fileLoading = false;
                          this.cancelDisable = false;
                        }else{
//                        console.log("1665");
                          this.fileLoading = false;
                          this.cancelDisable = false;
                        }
                      })
                    }
                  }
                }
                data.append('file',"");
                data.append('dir',"");
//              console.log(url);
              } else if (res.data.status_code == 5010){
                this.fileLoading = false;
                this.cancelDisable = false;
                instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
              } else {
//              console.log("1488");
                this.fileLoading = false;
                this.cancelDisable = false;
                instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                this.$Message.error('上传失败');
              }
          }).catch(error=>{
            console.log(error);
            this.fileLoading = false;
            this.cancelDisable = false;
            instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            this.$Message.error('上传失败');
          })
        }
        instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      }else{
        this.$Message.info('请完善图片再上传');
      }
    },
    // 高级验证 清空file和src的数据(重新上传)
    againUpload(){
      this.file = '';
      this.file2='';
      this.file3='';
      this.src='';
      this.src2='';
      this.src3='';
      this.$Message.info('操作成功');
    },
    // 实名认证的接口（设置）;
    realNameAuthentication(name){
      this.$refs[name].validate((valid)=>{
        if(valid){
          let params = {
            identification_name: this.nameApprove.name,
            identification_type: this.IDtype,
            identification_code: this.nameApprove.idCard
          }
//        console.log(params);
          api.realNameAuthentication(params).then(res=>{
            if(res.status_code == 200){
              this.$Message.success('提交成功');
              this.closePopover(name);
            }
          }).catch(error=>{
            console.log(error);
          })
        }
      })
    },
    //修改实名认证的接口
    changeRealNameAuth(name){
      this.$refs[name].validate((valid)=>{
        if(valid){
          let params = {
            identification_name: this.nameApprove.name,
            identification_type: this.IDtype,
            identification_code: this.nameApprove.idCard
          }
          api.changerealNameAuthentic(params).then(res=>{
//          console.log(res);
            if(res.status_code == 200){
              this.$Message.success('提交成功');
              this.closePopover(name);
            }
          })
        }
      })
    },
    //一开始绑定手机号的接口(先验证key和验证码再绑定手机号)
    bindPhoneNumber(name){
      this.$refs[name].validate((valid)=>{
        if(valid){
            if( this.phone_key ){
                    let params = {
                      verification_code:this.phoneNumChange.numberAuthCode,
                      verification_key:this.phone_key,
                      phone_number:this.phoneNumChange.numberPhone,
                      phone_idd:this.phoneNumChange.model9
                    }
                    //验证通过进行绑定
                    api.bindPhoneNumber(params).then(res=>{
                      if(res.status == 5002){
                        this.phoneNumChange.numberAuthCode = "";
                        this.phoneNumChange.numberPhone = "";
                        this.phone_key = "";
                      }else if(res.status_code == 200){
                        this.$Message.success('操作成功');
                        let datas = {phone_status:1}
                        this.$emit('datasReturn',datas)
                        this.closePopover(name);
                        this.phone_key = "";
                      } else if(res.status_code == 6001){
                        this.loadingCode = false;
                        this.nationalFlag =true;
                        this.phone_key = "";
                        clearInterval(this.timerPhone);
                        this.count = 60;
                        this.changePhoneNumber = false;
                        this.$refs[name].resetFields();
                        this.emailCode = 0;
                        this.phoneCode = 0,
                        this.googleCode = 0,
                        this.secondOrderSelect = [];
                        if(res.data.email == "email"){
                          this.emailCode = 1;
                        }
                        if(res.data.phone == "phone"){
                          this.phoneCode = 1;
                        }
                        if(res.data.google == "google"){
                          this.googleCode = 1;
                        }
                        this.waysafeRight();
                        this.twiceTestBeforeStatus = "createPhone";
                        this.twoVerificationJudge = true;
                      } 
                    })

            }else{
              this.$Message.info('请获取验证码');
            }
        }
      })
    },
    //修改手机号的接口(xxx)
    exchangePhoneNumber(name){
      this.$refs[name].validate((valid)=>{
        if(valid){
          if( this.phone_key ){
              let datas = {
                phone_number:this.phoneNumChange.numberPhone,
                phone_idd:this.phoneNumChange.model9,
                verification_code:this.phoneNumChange.numberAuthCode,
                verification_key:this.phone_key
              }
              //先验证手机验证码和key值才能进行绑定
              api.updatePhoneNumber(datas).then(res=>{
                if(res.status_code == 200){
                  this.$Message.success('操作成功');
                  this.cancelClose(name);
                  this.phone_key = "";
                }
              })
          }else{
            this.$Message.info('请获取验证码');
          }
        }
      })
    },
    //手机验证码的发送控制(给手机号得到key和验证码)
    telephone_code(name){
      this.$refs[name].validateField('numberPhone');
      this.$refs[name].validateField('model9');
        let paramss = {
          phone_number:this.phoneNumChange.numberPhone,
          phone_idd: this.phoneNumChange.model9
        }
        if(paramss.phone_idd){


          if(paramss.phone_number){
            if(/^[0-9]{2,20}$/.test(paramss.phone_number)){
              this.loadingCode = true;
//            console.log(parseInt(this.phoneNumChange.numberPhone));
              api.send_phone_authCode_Account(paramss).then(res=>{
                if(res.status_code == 200){
//                console.log(res);
                  this.timerPhone = setInterval(() => {
                    if (this.count > 0){
                      this.count--;
                      if(this.count ==59){
                        this.loadingCode = false;
                      }
                    } else {
                      clearInterval(this.timerPhone);
                      this.count = 60;
                    }
                  },1000);
                  this.phone_key = res.data.verification_key;
                  this.$Message.success('发送成功，请稍候');
                } else{
                  this.loadingCode = false;
                }
              }).catch(error=>{
                this.loadingCode = false;
              })
            }else{
              this.loadingCode = false;
            }
          }else{
            this.loadingCode = false;
          }


        }else{
          this.loadingCode = false;
        }

    },
    //修改绑定手机号的时候要获取手机号码和国际码(xxx)
    testPhoneNumber(){
      //先获取到手机号码和国际码
      api.getPhoneNumber().then(res=>{
        if(res.status_code == 200){
//        console.log(res);
          this.shoujihao = res.data.phone_number;
          this.internationalCode = res.data.phone_idd;
        }
      }).catch(res=>{
      })
    },
    //修改手机的第一个验证弹窗判断你是否本人,是否知道手机号(xxx)
    nextPhoneNumber (name){
      // 修改手机号的内部弹窗跳转
      this.$refs[name].validate((valid)=>{
        if(valid){
          let data = {
            phone_number:this.formTop.input1,
            phone_idd:this.internationalCode
          }
          api.testPhoneNumber(data).then(res=>{
            if(res.status_code==200){
              this.verifyPhoneNumber = false;
              this.changePhoneNumber = true;
              this.bindOrChangePhone = false;

              this.internationalCode = "";
              this.formTop.input1 = "";
              this.shoujihao = "";

              this.$Message.success('验证通过');
            }
          })
        }
      })
    },
    // 修改登录密码(直接提交3个密码写接口)
    changeLoginPassword(name){
      this.$refs[name].validate((valid)=>{
//      console.log(name)
        if(valid){
          let data = {
            old_password:this.changeLoginPasswords.oldpsw,
            new_password:this.changeLoginPasswords.newpsw,
            new_password_confirmation:this.changeLoginPasswords.newpswagain
          }
          api.changeLoginPassword(data).then(res=>{
            if(res.status_code == 200){
              this.$Message.success('操作成功');
              this.cancelClose(name);
            }else if(res.status_code == 6001){
              this.$refs[name].resetFields();
              this.loginPassword = false;
              this.emailCode = 0;
              this.phoneCode = 0,
              this.googleCode = 0,
              this.secondOrderSelect = [];
              if(res.data.email == "email"){
                  this.emailCode = 1;
              }
              if(res.data.phone == "phone"){
                this.phoneCode = 1;
              }
              if(res.data.google == "google"){
                this.googleCode = 1;
              }
              this.waysafeRight();
              this.twiceTestBeforeStatus = "updatePass";
              this.twoVerificationJudge = true;

            }
          })
        }
      })
    },
    //生日的函数(年月日的设置)
    birthdayNumberSet(data){
      let yearArr =[];
      let monthsArr =[];
      let daysArr =[];
      const year =100;
      const month =12;
      const day =31;
      let dates = new Date();
      let nowYear = dates.getFullYear();
      for(let i=0;i<year;i++ ){
        let yjson = {};
        yjson.value =  nowYear-i+"";
        yjson.label = nowYear-i+"";
        yearArr.push(yjson);
      }
      this.yearList = yearArr
      for(let i=0;i<12;i++ ){
        let mjson = {};
        mjson.value =  12-i+"";
        mjson.label = 12-i+"";
        monthsArr.push(mjson);
      }

      this.monthsList = monthsArr;
      monthsArr = monthsArr.reverse();
      for(let i=0;i<31;i++ ){
        let djson = {};
        djson.value =  31-i+"";
        djson.label = 31-i+"";
        daysArr.push(djson);
      }
      daysArr = daysArr.reverse();
      this.daysList = daysArr;
    },
    //根据不同的年份月份来设置不同的天数
    birthDayNumberSelect(num){
      let daysArr = [];
      for(let i=0;i<num;i++ ){
        let djson = {};
        djson.value =  num-i+"";
        djson.label = num-i+"";
        daysArr.push(djson);
      }
      daysArr = daysArr.reverse();
      this.daysList = daysArr;
    },
    //二次验证6001后，根据后台反的三个参数email，phone，google来设置二次验证的下拉表的内容
    waysafeRight(){

      let statusArr = [this.emailCode,this.phoneCode,this.googleCode];
      let orderSelect = [
        {
          value:"1",
          label: '邮箱验证'
        },
        {
          value:"2",
          label: '手机验证'
        },
        {
          value:"3",
          label: '谷歌验证'
        }
      ]

      for(let k=0;k<statusArr.length;k++){
        if(statusArr[k]!=0){
          this.secondOrderSelect.push(orderSelect[k]);
        }
      }
    },
    //设定国际码需要的参数
    internationalCodeSet(){

      if (this.areaPhoneNumBefores.length == 0) {
//       console.log(this.areaPhoneNumBefores)
        api.internationalCodeGet().then(res=>{
//        console.log(res);
          if(res.status_code ==200){
            this.areaPhoneNumBefores = res.data.list;
          }
        })
      }
    },
    // 年份的变化
    yearChange(data){
    }
  },
  watch:{
  	twoVerificationJudge (val) {
  		if (!val) {
  			this.$emit('twoTestBefore',"guanbi");
  			this.secondOrderSelect = []
  		}
  	},
  	threeVerificationTest (val) {
//		console.log('test', val)
  		if (!val) this.$emit('twoTestBefore',"guanbi");
  	},
  	Tanone:function(val){
  		// 数据变的时候触发
      // 根据不同的AccountSetting来的参数，来进行不同的弹窗跳转
  		this.Tanone = val;
  		if(this.Tanone != -1){
			  if( this.Tanone ==  "googleTestShow"){   //绑定谷歌需先走二次验证
          this.$emit('twoTestBefore',"kaiqi");
          let params = {
            status:"createGoogle"
          }
          api.accountSafeBeforeTest(params).then(res=>{
             this.$emit('twoTestBefore',"guanbi");
             this.$emit('huikuangTan',"kaiqilai");
             if(res.status_code == 200){
                this.googleTestShow = true;
                this.getGoogleTestMessage();

             }else if(res.status_code == 6001){
                if(res.data.email == "email"){
                  this.emailCode = 1;
                }
                if(res.data.phone == "phone"){
                  this.phoneCode = 1;
                }
                if(res.data.google == "google"){
                  this.googleCode = 1;
                }
                this.waysafeRight();
                this.twiceTestBeforeStatus = "createGoogle";
                this.twoVerificationJudge = true;
             }
          }).catch(error=>{
            this.$emit('twoTestBefore',"guanbi");
          })

	  		}else if(this.Tanone == 'editgoogleTestShow'){
	  			this.$emit('twoTestBefore',"kaiqi");
          let params = {
            status:"createGoogle"
          }
          api.accountSafeBeforeTest(params).then(res=>{
             this.$emit('twoTestBefore',"guanbi");
             this.$emit('huikuangTan',"kaiqilai");
             if(res.status_code == 200){
                this.editgoogleTestShow = true;
                this.getGoogleTestMessage();

             }else if(res.status_code == 6001){
                if(res.data.email == "email"){
                  this.emailCode = 1;
                }
                if(res.data.phone == "phone"){
                  this.phoneCode = 1;
                }
                if(res.data.google == "google"){
                  this.googleCode = 1;
                }
                this.waysafeRight();
                this.twiceTestBeforeStatus = "createGoogle";
                this.twoVerificationJudge = true;
             }
          }).catch(error=>{
            this.$emit('twoTestBefore',"guanbi");
          })
	  		}else if( this.Tanone == "centeredShow"){   //新建密钥的弹窗
	  			this.centeredShow = true;

	  			this.modifyOrNewApi = false;
	  		}else if( this.Tanone == "loginPassword"){  //重置登录密码，需走二次验证
          this.$emit('twoTestBefore',"kaiqi");
          let params = {
            status:"updatePass"
          }
          api.accountSafeBeforeTest(params).then(res=>{
             this.$emit('twoTestBefore',"guanbi");
             this.$emit('huikuangTan',"kaiqilai");
             if(res.status_code == 200){
                this.loginPassword = true;
             }else if(res.status_code == 6001){

                if(res.data.email == "email"){
                  this.emailCode = 1;
                }
                if(res.data.phone == "phone"){
                  this.phoneCode = 1;
                }
                if(res.data.google == "google"){
                  this.googleCode = 1;
                }
                this.waysafeRight();
                this.twiceTestBeforeStatus = "updatePass";
                this.twoVerificationJudge = true;
             }
          }).catch(error=>{
            this.$emit('twoTestBefore',"guanbi");
          })


	  		}else if( this.Tanone == "verifyPhoneNumber"){
	  			this.verifyPhoneNumber = true;

          this.testPhoneNumber();
	  		}else if( this.Tanone == "fundPasswordSafe"){   //更新资金密码，要走二次验证
          //修改pin
          this.$emit('twoTestBefore',"kaiqi");
          let params = {
            status:"updatePin"
          }
          api.accountSafeBeforeTest(params).then(res=>{
             this.$emit('twoTestBefore',"guanbi");
             this.$emit('huikuangTan',"kaiqilai");
             if(res.status_code == 200){
                this.ResetfundPassword = true;
                this.bindOrchangePin = true;
             }else if(res.status_code == 6001){
                if(res.data.email == "email"){
                  this.emailCode = 1;
                }
                if(res.data.phone == "phone"){
                  this.phoneCode = 1;
                }
                if(res.data.google == "google"){
                  this.googleCode = 1;
                }
                this.waysafeRight();
                this.twiceTestBeforeStatus = "updatePin";
                this.twoVerificationJudge = true;
             }
          }).catch(error=>{
            this.$emit('twoTestBefore',"guanbi");
          })
	  		}else if( this.Tanone == "changePhoneNumber"){  //绑定手机号码，要走二次验证
	  			// 这里是绑定手机号
          this.$emit('twoTestBefore',"kaiqi");
          let params = {
            status:"createPhone"
          }
          api.accountSafeBeforeTest(params).then(res=>{
             this.$emit('twoTestBefore',"guanbi");
             this.$emit('huikuangTan',"kaiqilai");
             if(res.status_code == 200){
                this.internationalCodeSet();
                this.changePhoneNumber = true;
                this.bindOrChangePhone = true;

             }else if(res.status_code == 6001){
                if(res.data.email == "email"){
                  this.emailCode = 1;
                }
                if(res.data.phone == "phone"){
                  this.phoneCode = 1;
                }
                if(res.data.google == "google"){
                  this.googleCode = 1;
                }
                this.waysafeRight();
                this.twiceTestBeforeStatus = "createPhone";
                this.twoVerificationJudge = true;
             }
          }).catch(error=>{
            this.$emit('twoTestBefore',"guanbi");
          })
	  		}else if( this.Tanone == "changeApi"){    //修改api
	  			// 这里是修改api,弹的是新建密钥
	  			this.centeredShow = true;

	  			this.modifyOrNewApi = true;
	  		}else if( this.Tanone == "realNameApprove"){ //实名认证的设置
	  			this.realNameApprove = true;

          this.realApproveSetOrChang =true;
	  		}else if( this.Tanone == "advancedVerify"){ //设定高级认证
          //开始高级认证
	  			this.advancedVerify = true;
          this.advancedVerifySetOrChange = true;
	  		}else if( this.Tanone == "comfirmDelete"){ //删除api列表的某一条
          this.comfirmDelete = true;

        }else if( this.Tanone == "bindfundPassword"){  //设置资金密码，要走二次验证
          //这是来绑定交易密码前的验证
          this.$emit('twoTestBefore',"kaiqi");
          let params = {
            status:"createPin"
          }
          api.accountSafeBeforeTest(params).then(res=>{
             this.$emit('twoTestBefore',"guanbi");
             this.$emit('huikuangTan',"kaiqilai");
             if(res.status_code == 200){
                this.ResetfundPassword = true;
                this.bindOrchangePin = false;
             }else if(res.status_code == 6001){
                if(res.data.email == "email"){
                  this.emailCode = 1;
                }
                if(res.data.phone == "phone"){
                  this.phoneCode = 1;
                }
                if(res.data.google == "google"){
                  this.googleCode = 1;
                }
                this.waysafeRight();
                this.twiceTestBeforeStatus = "createPin";
                this.twoVerificationJudge = true;
             }
          }).catch(error=>{
            this.$emit('twoTestBefore',"guanbi");
          })
        }else if( this.Tanone == "setBirthday"){  //设置生日

          api.accountSSetting().then(res=>{
            if(res.status_code == 200 && res.data){
              this.accountBigDatas = res.data;
              let birthdateNum = this.accountBigDatas.user_birthday;

              if( birthdateNum ){
                this.juluOldYear = birthdateNum.substring(0,4);
                this.juluOldMonth = parseInt(birthdateNum.substring(5,7)).toString();
                this.juluOldDay = parseInt(birthdateNum.substring(8)).toString();
                this.birthDatas.yearNum = birthdateNum.substring(0,4);
                this.birthDatas.monthNum = parseInt(birthdateNum.substring(5,7)).toString();
                this.birthDatas.dayNum = parseInt(birthdateNum.substring(8)).toString();
              }else{
                this.birthDatas.yearNum = "";
                this.birthDatas.monthNum = "";
                this.birthDatas.dayNum = "";
              }
            }
          })
          this.setBirthday = true;
          this.birthdayNumberSet();

        }else if( this.Tanone == "briefIntro"){  //设置简介
          this.briefIntro = true;

        }else if( this.Tanone == "setSex"){  //设置生日
          this.setSex = true;

        }else if( this.Tanone == "changeNameApprove"){  //修改普通实名认证
          this.realNameApprove = true;

          this.realApproveSetOrChang =false;
        }else if( this.Tanone == "changeAvatar"){  //设置改变头像
          this.changeAvatar = true;

        }else if( this.Tanone == "changeadvancedVerify"){  //修改高级认证
          //修改高级认证
          this.advancedVerify = true;
          this.advancedVerifySetOrChange = false;
        }else if( this.Tanone == "middleJump"){     //没实名认证前，点高级认证中转这里
          this.middleJump = true;
        }else if( this.Tanone == "twoVerificationJudge"){  //6001后二次验证的弹窗
          this.twoVerificationJudge = true;
        }else if( this.Tanone == "bindEmail"){  //绑定邮箱号，要走二次验证
          //要走二次验证
          this.$emit('twoTestBefore',"kaiqi");
          let params = {
            status:"createEmail"
          }
          api.accountSafeBeforeTest(params).then(res=>{
             this.$emit('twoTestBefore',"guanbi");
             this.$emit('huikuangTan',"kaiqilai");
             if(res.status_code == 200){
                this.bindEmail = true;
             }else if(res.status_code == 6001){
                if(res.data.email == "email"){
                  this.emailCode = 1;
                }
                if(res.data.phone == "phone"){
                  this.phoneCode = 1;
                }
                if(res.data.google == "google"){
                  this.googleCode = 1;
                }
                this.waysafeRight();
                this.twiceTestBeforeStatus = "createEmail";
                this.twoVerificationJudge = true;
             }
          }).catch(error=>{
            this.$emit('twoTestBefore',"guanbi");
          })
        }else if( this.Tanone == "canNotVerify"){  //提示不能进行高级认证
          this.canNotVerify = true;
        }else if( this.Tanone == "phoneTest"){  //开启关闭二次验证的 手机操作
          this.whichTest = 1;
          this.threeVerificationTest = true;
        }else if( this.Tanone == "emailTest"){ //开启关闭二次验证的 邮箱操作
          this.whichTest = 2;
          this.threeVerificationTest = true;
        }else if( this.Tanone == "googleTest"){ //开启关闭二次验证的 google操作
          this.threeVerificationTest = true;
          this.whichTest = 3;
        }
        this.$emit('reset',this.ranVariable);
  		}
  	},
    popoverData:function(val){  //拿到accountSetting传过来的数据
      if(val){
        this.acceptData = val;
        if( this.acceptData.access_key ){   //api数据
        //api的信息
          this.apiID = this.acceptData.user_access_id;
          this.secretKeydatas.tips = this.acceptData.note;
          this.secretKeydatas.ipAddress = this.acceptData.allow_ip;
          this.$emit('resetData',this.acceptData);
        }
          else if( this.acceptData.statusThree){
          let statusArr = [this.acceptData.email_status,this.acceptData.phone_status,this.acceptData.google_status];
          let orderSelect = [
            {
              value:"1",
              label: '邮箱验证'
            },
            {
              value:"2",
              label: '手机验证'
            },
            {
              value:"3",
              label: '谷歌验证'
            }
          ]
//        console.log(orderSelect);
          for(let k=0;k<statusArr.length;k++){
            if(statusArr[k]!=0){
              this.secondOrderSelect.push(orderSelect[k]);
            }
          }
          this.twiceTestBeforeStatus = this.acceptData.statusThree;
//        console.log(this.secondOrderSelect);
          this.$emit('resetData',this.acceptData);
        }else if( this.acceptData.user_avatar){  //头像数据
          //头像
          this.srcAvatar = this.acceptData.user_avatar;
        }else if(this.acceptData.briefIntro){  //简介数据
          this.briefIntroDatas.data = this.acceptData.briefIntro?this.acceptData.briefIntro:"";
        }else if(this.acceptData.setBirthday){   //生日数据
            this.birthDatas.yearNum =  this.acceptData.setBirthday.substring(0,4);
            this.birthDatas.monthNum = parseInt(this.acceptData.setBirthday.substring(5,7)).toString();
            this.birthDatas.dayNum =  parseInt(this.acceptData.setBirthday.substring(8)).toString();
        }else if( this.acceptData.setSex){   //性别数据
          //性别
//          console.log("性别");
            this.sexDatas.male = this.acceptData.setSex?this.acceptData.setSex.toString():"1";
        }
      }
    },
    safeAfteTiaoWho:function(val){ //二次验证成功后，根据返回值跳转九个不同的部分;手机，邮箱，google的绑定和二次验证开关，修改登录密码，和设置修改资金密码
//    console.log(val);
      if(val){
//      console.log(val);
        // let _this = this;
        if(val == "email"){
          this.whichTest = '2';
          this.threeVerificationTest = true;
//        console.log(this.threeVerificationTest);

          val = "";
        }else if(val == "phone"){

          this.threeVerificationTest = true;
          this.whichTest = '1';
          val ="";
        }else if(val == "google"){
          this.threeVerificationTest = true;
          this.whichTest = '3';
          val ="";
        }else if(val == "createPhone"){
          this.internationalCodeSet();
          this.changePhoneNumber = true;
          this.bindOrChangePhone = true;
          val ="";
        }else if(val == "updatePass"){

          this.loginPassword = true;
          val ="";
        }else if(val == "createGoogle"){

          this.googleTestShow = true;
          this.getGoogleTestMessage();
          val ="";
        }else if(val == "updatePin"){

          this.ResetfundPassword = true;
          this.bindOrchangePin = true;
          val ="";
        }else if(val == "createPin"){

          this.ResetfundPassword = true;
          this.bindOrchangePin = false;
          val ="";
        }else if(val == "createEmail"){
          this.bindEmail = true;
          val = "";
        }
        this.safeAfteTiaoWho = "";


      }
    },
    'birthDatas.monthNum':function(val,oldVal){  //月份改变后，根据年份月份改变天数
      this.juluOldYear = oldVal;
      if(val==1 || val==3 || val==5 || val==7 || val==8 || val==10 || val==12){
        this.birthDayNumberSelect(31);
      }else if(val==4 || val==6 || val==9 || val==11){
        this.birthDayNumberSelect(30);
      }else if(val==2){
        if(this.birthDatas.yearNum%4==0 || this.birthDatas.yearNum%400==0){
          this.birthDayNumberSelect(29);
        }else{
          this.birthDayNumberSelect(28);
        }
      }
    },
    'birthDatas.yearNum':function(val,oldval){ //年份改变后，根据年份月份改变天数
        this.juluOldMonth = oldval;
        if(this.birthDatas.monthNum == 2){
          if(val%4==0 || val%400==0){
            this.birthDayNumberSelect(29);
          }else{
            this.birthDayNumberSelect(28);
          }
        }
    }
  },
  computed:{
  	encryptPhoneNumber: function  (){
  		let phoneNumber = this.shoujihao;
  		let jiamihou = phoneNumber.substr(0,3)+"*****"+phoneNumber.substr(8);
  		return jiamihou;
  	}
  }
}
</script>

