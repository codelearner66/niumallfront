<template>
  <el-col :span="24">
    <el-col :span="4">
      <el-col :span="24">
        <router-link to="/">
          <img src="../assets/logo.png" style="height: 40px;width: 106px" alt="logo图标"/>
        </router-link>
      </el-col>
    </el-col>

    <el-col :span="18" style="height: 240px;">

      <el-col :span="7" style="height: 200px;">
        <!--       title-->
        <el-col :span="24" style="text-align: left">
          <h4 style="margin-left: 15px">快速导航</h4>
        </el-col>
        <!--       body-->
        <el-col :span="24">
          <el-col :span="12">
            <router-link to="/" class="router-header">
              &nbsp;<span class="headerspan">  首页</span>
            </router-link>
          </el-col>
          <el-col :span="12">
            <router-link to="/myInfo" class="router-header" type="text">
              <span class="headerspan"> 我的信息</span>
            </router-link>
          </el-col>
          <el-col :span="12">
            <router-link to="/shopCartList" class="router-header">
              <span class="headerspan"> 购物车</span>
            </router-link>
          </el-col>
          <el-col :span="12">
            <router-link to="/myOrders" class="router-header">
              <span class="headerspan">  我的订单</span>
            </router-link>
          </el-col>
          <el-col :span="12">
            <router-link to="/myInfor" class="router-header">
              <span class="headerspan">  消息</span>
            </router-link>
          </el-col>
          <el-col :span="12">
            <a @click="handleClick" href="javascript:void(0)" class="router-header">
              <span class="headerspan"> 免费注册</span>
            </a>
          </el-col>
        </el-col>
        <!--       foot-->
        <el-col :span="24" style="margin-top: 15px;">
          <el-col :span="4">
            <a href="https://github.com/codelearner66/NiuMall" class="router-header">
              <span class="headerspan"><i class="icon-icon-test2" style="color: hotpink;font-size: 25px"></i> </span>
            </a>
          </el-col>
          <el-col :span="4">
            <a href="https://wx.qq.com/" class="router-header">
              <span class="headerspan"><i class="icon-icon-test5" style="color: hotpink;font-size: 25px"></i> </span>
            </a>
          </el-col>
          <el-col :span="4">
            <a href="https://weibo.com/newlogin?tabtype=weibo&gid=102803&openLoginLayer=0&url=https%3A%2F%2Fweibo.com%2F"
               class="router-header">
              <span class="headerspan"><i class="icon-icon-test" style="color: hotpink;font-size: 25px"></i> </span>
            </a>
          </el-col>
        </el-col>
      </el-col>

      <el-col :span="8" style="height: 200px;border-left: 1px solid #dedbdb">
        <el-col :span="24" style="text-align: left">
          <h4 style="margin-left: 15px">关于我们&条款</h4>
        </el-col>
        <el-col :offset="2" :span="22">
          <el-col :span="5" class="headerspan">
            关于我们
          </el-col>
          <el-col :span="16" class="headerspan" style="text-align: center">
            河池学院雅园九栋115
          </el-col>
        </el-col>
        <el-col :offset="2" :span="22">
          <el-col :span="5" class="headerspan">
            意见反馈
          </el-col>
          <el-col :span="16" class="headerspan" style="text-align: center">
            邮件:553***997qq.com
          </el-col>
        </el-col>
        <el-col :offset="2" :span="22">
          <el-col :span="5" class="headerspan">
            隐私协议
          </el-col>
          <el-col :span="16" class="headerspan" style="text-align: center">

          </el-col>
        </el-col>
        <el-col :offset="2" :span="22">
          <el-col :span="5" class="headerspan">
            <a href="javascript:void(0)" @click="outerVisible=true" class="router-header">
              <span class="headerspan">用户协议 </span>
            </a>
          </el-col>
          <el-col :span="16" class="headerspan" style="text-align: center">
            <el-dialog
                title="用户协议"
                width="90%"
                top="40px"
                :visible.sync="outerVisible">
              <div>
               <pre>
               前言
               欢迎访问51CTO网站并使用我们提供的产品和服务。
               在完成注册程序或以任何方式使用51CTO网站服务前，请您务必仔细阅读并透彻理解本51CTO网站用户协议 (以下或简称“用户协议”)，在确认充分理解后选择接受或不接受本用户协议；
                 一旦您完成“同意条款并注册”或开始以其他方式使用51CTO服务，即表明您已阅读并同意受本服务条款的约束。如您不同意本服务条款或其中任何条款约定，您应不再进行下一步或停
                 止注册程序。
               51CTO再次提示您审慎阅读、充分理解各条款内容，特别是限制或免除责任的相应条款，限制或免除责任条款将以加粗或其他醒目形式提示您注意。
               总则
               1、协议规则及网址访问条件
               以下规则适用于所有访问本网站的用户或浏览者，北京无忧创想信息技术有限公司（"51CTO"）保留随时修改这些规则的权利。访问本网站的权利由51CTO根据下列条款授予。如果您不
                 同意下列任何条款,请停止使用本网址。对于违反这些规则的行为，51CTO有权采取法律和公平的补救措施。如果您继续使用本网址，则视为同意下列任何条款，并需要同时遵守51CTO
                 《隐私政策》。
               2、不承诺责任声明
               2.1 本网站所载的材料和信息，包括但不限于文本、图片、数据、观点、建议、网页或链接，虽然51CTO企图在网站上提供准确的材料和信息，除非51CTO和您签订一份书面协议取代本
                 协议，否则，在法律允许范围内，51CTO并不保证这些材料和内容的准确、完整、充分和可靠性，并且明确声明不对这些材料和内容的错误或遗漏承担责任，也不对这些材料和内容作
                 出任何明示或默示的、包括但不限于有关所有权担保、没有侵犯第三方权利、质量和没有计算机病毒的保证。在任何情况下，关于您向51CTO索赔总额不得超过您最近一次使用51CTO
                 服务所支出的费用。
               2.2 51CTO可以在没有任何通知或提示的情况下随时对本网站上的内容进行修改并在网站主页提示，为了得到最新版本的信息，请定时访问本网站，这些修改在51CTO网站公布后即开始
                 生效。
               2.3 51CTO在本网站上所提及的非51CTO产品或服务仅仅是为了提供相关信息，并不构成对这些产品、服务的认可或推荐。
               2.4 51CTO并不就网址上提供的任何产品、服务或信息作出任何声明、保证或认可。如用户需购买相关产品、服务的，除了受本协议约束外，同时还应受其签订的销售、服务等合同相关
                 的约束。
               3、权利归属
               网站上的所有商标、标志都属于51CTO所有，但明确注明引用其他方的内容除外。未经书面授权，任何人不得以任何方式展示、使用或做其他处理（包括但不限于复制、传播、展示、镜
                 像、上传、下载），也不得向他人表明您有权展示、使用或做其他处理。
               51CTO所有的产品、服务、技术与所有应用程序或其组件/功能（以下或简称“技术服务”）的知识产权均归属51CTO所有。
               除非另行声明，51CTO拥有51CTO在网站内发布文档等信息（包括但不限于文字、图形、图片、照片、音频、视频、图标、色彩、版面设计、电子文档）的所有权利（包括但不限于版权、
                 商标权、专利权、商业秘密和其他所有相关权利）。未经51CTO许可，任何人不得擅自使用如上内容（包括但不限于通过程序或设备监视、复制、转播、展示、镜像、上传、下载51CT
                 O网站内的任何内容）。被授权浏览、复制、打印和传播属于51CTO产品和服务内信息内容的，该等内容都不得用于商业目的且所有信息内容及其任何部分的使用都必须包括此权利声明。
               二、账户的注册、使用与安全
               1、您确认，在您完成注册程序或以其他51CTO允许的方式实际使用本服务时，您应当是具备完全民事权利能力和完全民事行为能力的自然人、法人或其他组织。若您是未成年人或限制民
                 事行为能力人，则您不具备前述主体资格，您及您的监护人应承担因您的不当注册行为而导致的一切后果。
               2、您设置的账户名不得违反国家法律法规或容易引起您与51CTO身份的混淆，否则您的账户可能不能注册成功或51CTO有权经通知您后予以注销。
               3、您应当按照法律法规要求或按相应页面的提示，准确提供并及时更新您的账户信息，以使之真实、及时、完整和准确。因您填写的信息、资料不真实、不及时、不完整或不准确的，您
                 应承担您不能使用51CTO账户（不能注册成功、或账户被冻结、注销）或您在使用过程中的后果和损失。
               4、一个51CTO账户仅能对应唯一的法律主体。除非有法律明文规定、司法裁定或者经51CTO同意的情况下，您不得以任何方式转让、赠与或让他人继承您的51CTO账户。
               5、如发现他人未经授权使用您的51CTO账户和密码，您应立即通知51CTO；51CTO将协助您冻结账户、更改密码或进行其他安全设置；您理解51CTO对您的请求采取行动需要合理时间，
                 51CTO对在采取行动前已经产生的以及由您引发的后果（包括但不限于您的任何损失）不承担任何责任。
               三、责任限制
               1、用户责任
               您在51CTO移动客户端、官方主页、论坛、社区自行上传、提供、发布相关信息，包括但不限于用户名称、公司名称、 联系人及联络信息，相关图片、资讯等，该等信息均由用户自行提
                 供，您须对其提供的任何信息依法承担全部责任。您使用51CTO服务时将遵从国家、地方法律法规、行业惯例和社会公共道德，不会利用51CTO提供的服务进行存储、发布、传播如下
                 信息和内容：（1）违反国家法律法规政策的任何内容（信息）；（2）违反国家规定的政治宣传和/或新闻信息；（3）涉及国家秘密和/或安全的信息；（4）封建迷信和/或淫秽、色
                 情、下流的信息或教唆犯罪的信息；（5）博彩有奖、赌博游戏；违反国家民族和宗教政策的信息；（6）妨碍互联网运行安全的信息；（7）侵害他人合法权益的信息和/或其他有损于
                 社会秩序、社会治安、公共道德的信息或内容；（8）您同时承诺不得为他人发布上述不符合国家规定和/或本服务条款约定的信息内容提供任何便利，包括但不限于设置URL、BANNE
                 R链接等；
               2、转载作品
               51CTO转载作品（包括论坛内容）出于传递更多信息之目的，并不意味51CTO赞同其观点或证实其内容的真实性。
               3、安全
               51CTO在此提示，您在使用51CTO产品及服务期间应当遵守中华人民共和国的法律，不得危害网络安全，不得利用51CTO产品及服务从事侵犯他人名誉、隐私、知识产权和其他合法权益的
                 活动。尽管有前述提示，51CTO不对您使用51CTO产品及服务的用途和目的承担任何责任。
               4、第三方链接
               本网站可能保留有与第三方网站或网址的链接，访问这些链接将由用户自己作出决定，51CTO并不保证这些链接上所提供的任何信息、数据、观点、图片、陈述或建议的准确性、完整性、
                 充分性和可靠性。51CTO提供这些链接仅仅在于提供方便，并不表示51CTO对这些信息的认可和推荐，也不是用于宣传或广告目的。
               5、个人信息的使用
               5.1 通常情况下，您不需要提供任何个人信息就可以浏览51CTO的网站。为特定的目的（例如：注册并参加51CTO技术有限公司提供的考试），如果您以自愿填写的方式提供注册或订阅电
                 子信息所需的账号、密码、姓名（包括拼音等同类表现形式）、性别、证件种类及证件号、出生年月日、国家/地区及代码、电子邮件信箱、电话、联系地址和邮政编码、所希望提供的
                 服务或喜好信息、客户代码、验证码以及其他个人信息，则表示您已经了解该特定目的，并同意51CTO为实现该特定目的使用您自愿提供的个人信息。
               5.2 关于51CTO如何使用您的个人信息，请参考【隐私政策】。【隐私政策】是51CTO公司用户协议不可分割的组成部分。
               四、知识产权保护
               我们尊重知识产权，反对并打击侵犯知识产权的行为。任何组织或个人或讲师为51CTO提供的产品及服务（如转载文章、发布的信息、发布的视频课程、专栏等）可能侵犯其合法权益的，
                 可以通过以下形式向51CTO提出书面权利通知，51CTO将在收到知识产权权利人合格通知后依法尽快处理：
               通过邮寄的方式将通知书及证明材料原件邮寄至：
               收件人： 51CTO客服部
               地址：北京市海淀区中关村南一条甲一号ECO中科爱克大厦6-7层
               邮编：100190
               将通知书及证明材料扫描后通过电子邮件发送至电子邮箱： user@51CTO.com
               五、不可抗力
               51CTO的网站可能因为下列不可抗力或意外事件无法正常运行的，51CTO不承担损害赔偿责任：
               （1）因自然灾害、罢工、暴乱、战争、政府行为、司法行政命令等不可抗力因素；
               （2）因电力供应故障、通讯网络故障等公共服务因素；
               （3）经提前公告或通知的，51CTO在短时间内的系统维护。
               六、法律适用
               1、通过访问本网站及使用通过本网站网址提供的设施和（或）服务，即表示您同意该访问及该实施和（或）服务的提供受中华人民共和国法律的约束，且您同意受中华人民共和国法院的
                 管辖。
               2、因本协议产生争议应提交北京市海淀区人民法院解决。
               七、通知送达
               1、您理解并同意，51CTO可通过网页公告、电子邮件、站内信、短信、电话、系统消息以及即时通信等以上一种或多种通知方式向您发送通知，且51CTO可以信赖您所提供的联系信息是
                 完整、准确且当前有效的；上述通知在发送成功后视为已送达。
               2、除非本服务条款另有约定或51CTO与您另行签订的协议明确规定了通知方式，您发送给51CTO的通知，应当通过51CTO对外正式公布的通信地址、传真号码、电子邮件地址等联系信息
                 进行送达。
               八、条款的更新和终止
               1、 51CTO有权对本服务条款及相应的服务规则内容进行变更，并将网页公告、电子邮件、站内信、短信等方式予以公告或通知；若您在本服务条款内容变更后继续使用本服务的，表示
                 您已充分阅读、理解并接受修改后的内容，也将遵循修改后的条款内容。
               2、在您的账户注销或经双方协商一致终止网站服务的，本服务条款终止。
               九、其他事宜
               1、本服务条款由本服务条款的内容、网站相关页面上展现的规则、规范，服务说明（含操作文档）和您点击确认的其他条款/条件组成，51CTO和您均受其约束，且其中的相关名词可相
                 互引用、解释。
               2、本服务条款任一条款被视为废止、无效或不可执行，该条款应视为可分的且不影响本服务条款及其他条款的有效性及可执行性。
               3、51CTO有权在51CTO官网上发布公告、发站内通知或邮件通知等方式将本服务的权利义务全部或者部分转移给51CTO的关联公司。
               4、除另有约定外，出于服务专业性考虑，51CTO亦可能委托关联公司或其他法律主体向您提供51CTO网站上一项或多项具体服务，同时您可能会与该等公司订立相关条款或条件，请您审
                 慎阅读、充分理解条款和条件内容，选择接受或不接受该条款和条件。
               5、请您务必仔细阅读并理解本协议，在确认充分理解同意后，一旦您选择51CTO的任何服务，则视为您接受并同意遵守与51CTO的约定的权利义务。
               </pre>
              </div>
              <div slot="footer">
                <el-button @click="outerVisible = false">取 消</el-button>
              </div>

            </el-dialog>
          </el-col>
        </el-col>
        <el-col :offset="2" :span="22">
          <el-col :span="22" class="headerspan" style="text-align: left">
            Copyright © 20022-2022 niumall.COM 桂ICP证666666 版权所有 未经许可 请勿转载
          </el-col>
          <el-col :span="2">
            &nbsp;
          </el-col>
        </el-col>

      </el-col>

      <el-col :span="7" style="height: 200px;border-left: 1px solid #dedbdb">
        <el-col :span="24" style="text-align: left">
          <h4 style="margin-left: 15px">友情链接</h4>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <a href="https://www.iconfont.cn/collections/index?spm=a313x.7781069.1998910419.5&type=1"
               class="router-header">
              <span class="headerspan">阿里巴巴矢量图标库</span>
            </a>
          </el-col>
          <el-col :span="12">
            <a href="https://element.eleme.cn/#/zh-CN/component/installation" class="router-header">
              <span class="headerspan">Element Ui </span>
            </a>
          </el-col>
          <el-col :span="12">
            <a href="https://cloud.tencent.com/login?s_url=https%3A%2F%2Fconsole.cloud.tencent.com%2Fdeveloper"
               class="router-header">
              <span class="headerspan">腾讯云</span>
            </a>
          </el-col>
          <el-col :span="12">
            <a href="https://auth.alipay.com/login/ant_sso_index.htm?goto=https%3A%2F%2Fopen.alipay.com%2Fdevelop%2Fsandbox%2Fapp"
               class="router-header">
              <span class="headerspan">支付宝开放平台 </span>
            </a>
          </el-col>
          <el-col :span="12">
            <a href="https://account.aliyun.com/login/login.htm?oauth_callback=https%3A%2F%2Fdysms.console.aliyun.com%2Fquickstart&lang=zh"
               class="router-header">
              <span class="headerspan">阿里云短信服务 </span>
            </a>
          </el-col>
        </el-col>
      </el-col>
    </el-col>
  </el-col>
</template>

<script>
import router from "@/router";
import Cookies from "js-cookie";

export default {
  name: "footerNav",
  data() {
    return {
      outerVisible: false,
    }
  },
  methods: {
    handleClick() {
      setTimeout(() => {
        router.push("/login")
      }, 1000);
      localStorage.removeItem("token");
      Cookies.remove("token");
    }
  }
}
</script>

<style scoped>
.router-header {
  text-decoration: none;
  padding: 0 0 0 0;
}

.headerspan {
  font-size: xx-small;
  line-height: 30px;
  color: #2c3e50;
}

.headerspan:hover {
  color: #de4949;
}
</style>