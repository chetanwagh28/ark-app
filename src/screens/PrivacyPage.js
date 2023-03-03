import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ScrollView, Dimensions, SafeAreaView } from 'react-native';
// import { Container, Header, Content, Footer, FooterTab, Left, Body, Right, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import style from '../assets/style.js';
import { Header } from 'react-native-elements';
import { Avatar, Button, Card, Title, Paragraph, Headline, Subheading, List, Divider } from 'react-native-paper';


const PrivacyPage = ({props, navigation}) => {

    return (
      <SafeAreaView style={style.container}>
          
          <Header backgroundColor="#00b2b6"
                leftComponent={<>
                        <Icon name="ios-arrow-back" size={25} color="#fff" onPress={() => navigation.goBack()} />
                      </>}
                centerComponent={<><Text style={style.PageTitle}>Privacy Policy</Text></>}
                rightComponent={<>
                  </>}
              />
        <ScrollView style={{padding: 20}}>

              <Paragraph style={styles.textColor}>
                        AVARK Private Limited Private Limited (“us”, “we”, or “AVARK”, which also includes its affiliates) is the
                        author and publisher of the internet resource www.AVARK.com (“Website”) on the world wide web
                        as well as the software and applications provided by AVARK, including but not limited to the
                        mobile application ‘ARK’, and the software and applications of the brand names ‘ARK’, ‘AVARK Tab’,
                        ‘AVARK Reach’, ‘Hello’, and ‘Health Account’ (together with the Website, referred to as the
                        “Services”).
              </Paragraph>
              <Divider />
              <Paragraph style={styles.textColor}>
                        This privacy policy ("<Subheading style={styles.textColor}>Privacy Policy</Subheading>") explains how we collect, use, share, disclose and protect
                        Personal information about the Users of the Services, including the Practitioners (as defined in the
                        Terms of Use, which may be accessed via the following weblink https://AVARK.com/privacy (the
                        “Terms of Use”)), the End-Users (as defined in the Terms of Use), and the visitors of Website (jointly
                        and severally referred to as “you” or “Users” in this Privacy Policy). We created this Privacy Policy to
                        demonstrate our commitment to the protection of your privacy and your personal information.
                        Your use of and access to the Services is subject to this Privacy Policy and our Terms of Use. Any
                        capitalized term used but not defined in this Privacy Policy shall have the meaning attributed to it
                        in our Terms of Use.
              </Paragraph>
              <Divider />
              <Paragraph style={styles.textColor}>
                BY USING THE SERVICES OR BY OTHERWISE GIVING US YOUR INFORMATION, YOU WILL BE
                DEEMED TO HAVE READ, UNDERSTOOD AND AGREED TO THE PRACTICES AND POLICIES OUTLINED
                IN THIS PRIVACY POLICY AND AGREE TO BE BOUND BY THE PRIVACY POLICY. YOU HEREBY CONSENT
                TO OUR COLLECTION, USE AND SHARING, DISCLOSURE OF YOUR INFORMATION AS DESCRIBED IN
                THIS PRIVACY POLICY. WE RESERVE THE RIGHT TO CHANGE, MODIFY, ADD OR DELETE PORTIONS OF
                THE TERMS OF THIS PRIVACY POLICY, AT OUR SOLE DISCRETION, AT ANY TIME. IF YOU DO NOT
                AGREE WITH THIS PRIVACY POLICY AT ANY TIME, DO NOT USE ANY OF THE SERVICES OR GIVE US
                ANY OF YOUR INFORMATION. IF YOU USE THE SERVICES ON BEHALF OF SOMEONE ELSE (SUCH AS
                YOUR CHILD) OR AN ENTITY (SUCH AS YOUR EMPLOYER), YOU REPRESENT THAT YOU ARE
                AUTHORISED BY SUCH INDIVIDUAL OR ENTITY TO (I) ACCEPT THIS PRIVACY POLICY ON SUCH
                INDIVIDUAL’S OR ENTITY’S BEHALF, AND (II) CONSENT ON BEHALF OF SUCH INDIVIDUAL OR ENTITY
                TO OUR COLLECTION, USE AND DISCLOSURE OF SUCH INDIVIDUAL’S OR ENTITY’S INFORMATION AS
                DESCRIBED IN THIS PRIVACY POLICY.
              </Paragraph>
              <Divider />


                <List.Section>
                  <Title style={styles.textColor}>1.WHY THIS PRIVACY POLICY?</Title>
                  <Paragraph style={styles.subheading}>This Privacy Policy is published in compliance with, inter alia:</Paragraph>
                  <Paragraph style={styles.description}>- Section 43A of the Information Technology Act, 2000;</Paragraph>
                  <Paragraph style={styles.description}>- Regulation 4 of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Information) Rules, 2011 (the “SPI Rules”);</Paragraph>
                  <Paragraph style={styles.description}>- Regulation 3(1) of the Information Technology (Intermediaries Guidelines) Rules, 2011.</Paragraph>
                  

                  <Paragraph style={styles.subheading}>This Privacy Policy states the following:</Paragraph>
                  <Paragraph style={styles.description}>- The type of information collected from the Users, including Personal Information (as
de ned in paragraph 2 below) and Sensitive Personal Data or Information (as
de ned in paragraph 2 below) relating to an individual;</Paragraph>
                  <Paragraph style={styles.description}>- The purpose, means and modes of collection, usage, processing, retention and
destruction of such information; and</Paragraph>
                  <Paragraph style={styles.description}>- How and to whom AVARK will disclose such information.</Paragraph>


                  <Title style={styles.textColor}>2.COLLECTION OF PERSONAL INFORMATION</Title>
                  <Paragraph style={styles.subheading}>Generally some of the Services require us to know who you are so that we can best meet
your needs. When you access the Services, or through any interaction with us via emails,
telephone calls or other correspondence, we may ask you to voluntarily provide us with
certain information that personally identi es you or could be used to personally identify
you. You hereby consent to the collection of such information by AVARK. Without prejudice
to the generality of the above, information collected by us from you may include (but is not
limited to) the following:</Paragraph>
                  <Paragraph style={styles.description}>- contact data (such as your email address and phone number);</Paragraph>
                  <Paragraph style={styles.description}>- demographic data (such as your gender, your date of birth and your pin code);</Paragraph>
                  <Paragraph style={styles.description}>- data regarding your usage of the services and history of the appointments made by or with you through the use of Services;</Paragraph>
                  <Paragraph style={styles.description}>- insurance data (such as your insurance carrier and insurance plan);</Paragraph>
                  <Paragraph style={styles.description}>- other information that you voluntarily choose to provide to us (such as information shared by you with us through emails or letters.</Paragraph>


                  <Paragraph style={styles.subheading}>The information collected from you by AVARK may constitute ‘personal information’ or
‘sensitive personal data or information’ under the SPI Rules.
<Subheading style={styles.textColor}>“Personal Information”</Subheading> is de ned under the SPI Rules to mean any information that
relates to a natural person, which, either directly or indirectly, in combination with other
information available or likely to be available to a body corporate, is capable of identifying
such person.
The SPI Rules further de ne “Sensitive Personal Data or Information” of a person to mean
personal information about that person relating to:</Paragraph>
                  <Paragraph style={styles.description}>- passwords;</Paragraph>
                  <Paragraph style={styles.description}>- financial information such as bank accounts, credit and debit card details or other payment instrument details;</Paragraph>
                  <Paragraph style={styles.description}>- physical, physiological and mental health condition;</Paragraph>
                  <Paragraph style={styles.description}>- sexual orientation;</Paragraph>
                  <Paragraph style={styles.description}>- medical records and history;</Paragraph>
                  <Paragraph style={styles.description}>- biometric information;</Paragraph>
                  <Paragraph style={styles.description}>- information received by body corporate under lawful contract or otherwise;</Paragraph>
                  <Paragraph style={styles.description}>- visitor details as provided at the time of registration or thereafter; and</Paragraph>
                  <Paragraph style={styles.description}>- call data records.</Paragraph>

                  <Paragraph style={styles.subheading}>AVARK will be free to use, collect and disclose information that is freely available in the
public domain without your consent.</Paragraph>

                  <Title style={styles.textColor}>3.PRIVACY STATEMENTS</Title>
                  <Paragraph style={styles.subheading}>3.1ALL USERS NOTE:This section applies to all users.</Paragraph>
                  <Paragraph style={styles.description}>- 3.1.1Accordingly, a condition of each User’s use of and access to the
Services is their acceptance of the Terms of Use, which also involves
acceptance of the terms of this Privacy Policy. Any User that does not agree
with any provisions of the same has the option to discontinue the Services
provided by AVARK immediately.</Paragraph>
                  <Paragraph style={styles.description}>- 3.1.2An indicative list of information that AVARK may require you to provide
to enable your use of the Services is provided in the Schedule annexed to
this Privacy Policy.</Paragraph>
                  <Paragraph style={styles.description}>- 3.1.3All the information provided to AVARK by a User, including Personal
Information or any Sensitive Personal Data or Information, is voluntary. You
understand that AVARK may use certain information of yours, which has
been designated as Personal Information or ‘Sensitive Personal Data or
Information’ under the SPI Rules, (a) for the purpose of providing you theServices, (b) for commercial purposes and in an aggregated or non-
personally identi able form for research, statistical analysis and business
intelligence purposes, (c) for sale or transfer of such research, statistical or
intelligence data in an aggregated or non-personally identi able form to
third parties and af liates (d) for communication purpose so as to provide
You a better way of booking appointments and for obtaining feedback in
relation to the Practitioners and their practice, (e) debugging customer
support related issues.. (f) for the purpose of contacting you to complete any
transaction if you do not complete a transaction after having provided us
with your contact information in the course of completing such steps that are
designed for completion of the transaction. AVARK also reserves the right to
use information provided by or about the End-User for the following
purposes:</Paragraph>

                  <Paragraph style={styles.subdescription}>- Publishing such information on the Website.</Paragraph>
                  <Paragraph style={styles.subdescription}>- Contacting End-Users for offering new products or services.</Paragraph>
                  <Paragraph style={styles.subdescription}>- Contacting End-Users for taking product and Service feedback.</Paragraph>
                  <Paragraph style={styles.subdescription}>- Analyzing software usage patterns for improving product design and
utility.</Paragraph>
                  <Paragraph style={styles.subdescription}>- Analyzing anonymized practice information for commercial use.</Paragraph>
                  <Paragraph style={styles.subdescription}>- Processing payment instructions including those through
independent third party service providers such as payment gateways,
banking and nancial institutions, pre-paid instrument and wallet
providers for processing of payment transaction or deferral of
payment facilities.</Paragraph>
                  <Paragraph style={styles.description}>- If you have voluntarily provided your Personal Information to AVARK for any
of the purposes stated above, you hereby consent to such collection and use
of such information by AVARK. However, AVARK shall not contact You on Your
telephone number(s) for any purpose including those mentioned in this
sub-section 4.1(iii), if such telephone number is registered with the Do Not
Call registry (“DNC Registry”) under the PDPA without your express, clear and
un-ambiguous written consent.</Paragraph>
                  <Paragraph style={styles.description}>- 3.1.4Collection, use and disclosure of information which has been
designated as Personal Information or Sensitive Personal Data or
Information’ under the SPI Rules requires your express consent. By af rming
your assent to this Privacy Policy, you provide your consent to such use,
collection and disclosure as required under applicable law.</Paragraph>
                  <Paragraph style={styles.description}>- 3.1.5AVARK does not control or endorse the content, messages or
information found in any Services and, therefore, AVARK speci cally
disclaims any liability with regard to the Services and any actions resulting
from your participation in any Services, and you agree that you waive any
claims against AVARK relating to same, and to the extent such waiver may beineffective, you agree to release any claims against AVARK relating to the
same.</Paragraph>
                  <Paragraph style={styles.description}>- 3.1.6You are responsible for maintaining the accuracy of the information
you submit to us, such as your contact information provided as part of
account registration. If your personal information changes, you may correct,
delete inaccuracies, or amend information by making the change on our
member information page or by contacting us
through support@AVARK.com. We will make good faith efforts to make
requested changes in our then active databases as soon as reasonably
practicable. If you provide any information that is untrue, inaccurate, out of
date or incomplete (or becomes untrue, inaccurate, out of date or
incomplete), or AVARK has reasonable grounds to suspect that the
information provided by you is untrue, inaccurate, out of date or incomplete,
AVARK may, at its sole discretion, discontinue the provision of the Services to
you. There may be circumstances where AVARK will not correct, delete or
update your Personal Data, including (a) where the Personal Data is opinion
data that is kept solely for evaluative purpose; and (b) the Personal Data is in
documents related to a prosecution if all proceedings relating to the
prosecution have not been completed.</Paragraph>
                  <Paragraph style={styles.description}>- 3.1.7If you wish to cancel your account or request that we no longer use
your information to provide you Services, contact us through
support@AVARK.com . We will retain your information for as long as your
account with the Services is active and as needed to provide you the Services.
We shall not retain such information for longer than is required for the
purposes for which the information may lawfully be used or is otherwise
required under any other law for the time being in force. After a period of
time, your data may be anonymized and aggregated, and then may be held
by us as long as necessary for us to provide our Services effectively, but our
use of the anonymized data will be solely for analytic purposes. Please note
that your withdrawal of consent, or cancellation of account may result in
AVARK being unable to provide you with its Services or to terminate any
existing relationship AVARK may have with you.</Paragraph>
                  <Paragraph style={styles.description}>- 3.1.8If you wish to opt-out of receiving non-essential communications such
as promotional and marketing-related information regarding the Services,
please send us an email at support@AVARK.com .</Paragraph>
                  <Paragraph style={styles.description}>- 3.1.9AVARK may require the User to pay with a credit card, wire transfer,
debit card or cheque for Services for which subscription amount(s) is/are
payable. AVARK will collect such User’s credit card number and/or other
nancial institution information such as bank account numbers and will usethat information for the billing and payment processes, including but not
limited to the use and disclosure of such credit card number and information
to third parties as necessary to complete such billing operation. Veri cation
of credit information, however, is accomplished solely by the User through
the authentication process. User’s credit-card/debit card details are
transacted upon secure sites of approved payment gateways which are
digitally under encryption, thereby providing the highest possible degree of
care as per current technology. However, AVARK provides you an option not
to save your payment details. User is advised, however, that internet
technology is not full proof safe and User should exercise discretion on using
the same.</Paragraph>
                  <Paragraph style={styles.description}>- 3.1.10Due to the communications standards on the Internet, when a User
or the End-User or anyone who visits the Website, AVARK automatically
receives the URL of the site from which anyone visits. AVARK also receives the
Internet Protocol (IP) address of each User’s computer (or the proxy server a
User used to access the World Wide Web), User’s computer operating system
and type of web browser the User is using, email patterns, as well as the
name of User’s ISP. This information is used to analyze overall trends to help
AVARK improve its Service. The linkage between User’s IP address and User’s
personally identi able information is not shared with or disclosed to third
parties. Notwithstanding the above, AVARK may share and/or disclose someof the aggregate ndings (not the speci c data) in anonymized form (i.e.,
non-personally identi able) with advertisers, sponsors, investors, strategic
partners, and others in order to help grow its business</Paragraph>
                  <Paragraph style={styles.description}>- 3.1.11The Website uses temporary cookies to store certain (that is not
sensitive personal data or information) that is used by AVARK and its service
providers for the technical administration of the Website, research and
development, and for User administration. In the course of serving
advertisements or optimizing services to its Users, AVARK may allow
authorized third parties to place or recognize a unique cookie on the User’s
browser. The cookies however, do not store any Personal Information of the
User. You may adjust your internet browser to disable cookies. If cookies are
disabled you may still use the Website, but the Website may be limited in
the use of some of the features.</Paragraph>
                  <Paragraph style={styles.description}>- 3.1.12A User may have limited access to the Website without creating an
account on the Website. Unregistered Users can make appointments with
the doctors by providing their name and phone number. In order to have
access to all the features and bene ts on our Website, a User must rst create
an account on our Website. To create an account, a User is required to
provide the following information, which such User recognizes and expressly
acknowledges is Personal Information allowing others, including AVARK, toidentify the User: name, User ID, email address, country, ZIP/postal code,
age, phone number, password chosen by the User and valid nancial
account information. Other information requested on the registration page,
including the ability to receive promotional offers from AVARK, is optional.
AVARK may, in future, include other optional requests for information from
the User to help AVARK to customize the Website to deliver personalized
information to the User.</Paragraph>
                  <Paragraph style={styles.description}>- 3.1.13This Privacy Policy applies to Services that are owned and operated by
AVARK. AVARK does not exercise control over the sites displayed as search
results or links from within its Services. These other sites may place their own
cookies or other les on the Users’ computer, collect data or solicit personal
information from the Users, for which AVARK is not responsible or liable.
Accordingly, AVARK does not make any representations concerning the
privacy practices or policies of such third parties or terms of use of such
websites, nor does AVARK guarantee the accuracy, integrity, or quality of the
information, data, text, software, sound, photographs, graphics, videos,
messages or other materials available on such websites. The inclusion or
exclusion does not imply any endorsement by AVARK of the website, the
website's provider, or the information on the website. If you decide to visit a
third party website linked to the Website, you do this entirely at your own
risk. AVARK encourages the User to read the privacy policies of that website.</Paragraph>
                  <Paragraph style={styles.description}>- 3.1.14The Website may enable User to communicate with other Users or to
post information to be accessed by others, whereupon other Users may
collect such data. Such Users, including any moderators or administrators,
are not authorized AVARK representatives or agents, and their opinions or
statements do not necessarily re ect those of AVARK, and they are not
authorized to bind AVARK to any contract. AVARK hereby expressly disclaims
any liability for any reliance or misuse of such information that is made
available by Users or visitors in such a manner.</Paragraph>
                  <Paragraph style={styles.description}>- 3.1.15AVARK does not collect information about the visitors of the Website
from other sources, such as public records or bodies, or private
organisations, save and except for the purposes of registration of the Users
(the collection, use, storage and disclosure of which each End User must
agree to under the Terms of Use in order for AVARK to effectively render the
Services).</Paragraph>
                  <Paragraph style={styles.description}>- 3.1.16AVARK maintains a strict "No-Spam" policy, which means that AVARK
does not intend to sell, rent or otherwise give your e-mail address to a third
party without your consent.</Paragraph>
                  <Paragraph style={styles.description}>- 3.1.17AVARK has implemented best international market practices and
security policies, rules and technical measures to protect the personal data
that it has under its control from unauthorised access, improper use or
•disclosure, unauthorised modi cation and unlawful destruction or accidental
loss. However, for any data loss or theft due to unauthorized access to the
User’s electronic devices through which the User avails the Services, AVARK
shall not be held liable for any loss whatsoever incurred by the User.</Paragraph>
                  <Paragraph style={styles.description}>- 3.1.18AVARK implements reasonable security practices and procedures and
has a comprehensive documented information security programme and
information security policies that contain managerial, technical, operational
and physical security control measures that are commensurate with respect
to the information being collected and the nature of AVARK’s business.</Paragraph>
                  <Paragraph style={styles.description}>- 3.1.19AVARK takes your right to privacy very seriously and other than as
speci cally stated in this Privacy Policy, will only disclose your Personal
Information in the event it is required to do so by law, rule, regulation, law
enforcement agency, governmental of cial, legal authority or similar
requirements or when AVARK, in its sole discretion, deems it necessary in
order to protect its rights or the rights of others, to prevent harm to persons
or property, to ght fraud and credit risk, or to enforce or apply the Terms of
Use.</Paragraph>


                  <Paragraph style={styles.subheading}>3.2PRACTITIONERS NOTE:This section applies to all Practitioners.</Paragraph>
                  <Paragraph style={styles.description}>- 3.2.1As part of the registration as well as the application creation and
submission process that is available to Practitioners on AVARK, certaininformation, including Personal Information or Sensitive Personal Data or
Information is collected from the Practitioners.</Paragraph>
                  <Paragraph style={styles.description}>- 3.2.2All the statements in this Privacy Policy apply to all Practitioners, and
all Practitioners are therefore required to read and understand the privacy
statements set out herein prior to submitting any Personal Information or
Sensitive Personal Data or Information to AVARK, failing which they are
required to leave the Services, including the Website immediately.</Paragraph>
                  <Paragraph style={styles.description}>- 3.2.3Practitioners’ personally identi able information, which they choose to
provide to AVARK, is used to help the Practitioners describe and identify
themselves. This information is exclusively owned by AVARK You will be the
owner of your information and you consent to AVARK collecting, using,
processing and/or disclosing this information for the purposes hereinafter
stated . AVARK may use such information for commercial purposes and in an
aggregated or non-personally identi able form for research, statistical
analysis and business intelligence purposes, and may sell or otherwise
transfer such research, statistical or intelligence data in an aggregated or
non-personally identi able form to third parties and af liates. AVARK also
reserves the right to use information provided by or about the Practitioner
for the following purposes:</Paragraph>
                  <Paragraph style={styles.subdescription}>- Publishing such information on the Website.</Paragraph>
                  <Paragraph style={styles.subdescription}>- Contacting Practitioners for offering new products or services subject
to the telephone number registered with the DNC Registry.</Paragraph>
                  <Paragraph style={styles.subdescription}>- Contacting Practitioners for taking product feedback.</Paragraph>
                  <Paragraph style={styles.subdescription}>- Analyzing software usage patterns for improving product design and
utility.</Paragraph>
                  <Paragraph style={styles.subdescription}>- Analyzing anonymized practice information including nancial, and
inventory information for commercial use.</Paragraph>

                  <Paragraph style={styles.description}>- 3.2.4AVARK automatically enables the listing of Practitioners’ information
on its Website for every ‘Doctor’ or ‘Clinic’ added to a Practice using its
software. The Practitioner information listed on Website is displayed when
End-Users search for doctors on Website, and the Practitioner information
listed on Website is used by End-Users to request for doctor appointments.
Any personally identi able information of the Practitioners listed on the
Website is not generated by AVARK and is provided to AVARK by Practitioners
who wish to enlist themselves on the Website, or is collected by AVARK from
the public domain. AVARK displays such information on its Website on an as-
is basis making no representation or warranty on the accuracy or
completeness of the information. As such, we strongly encourage
Practitioners to check the accuracy and completeness of their information
from time to time, and inform us immediately of any discrepancies, changesor updates to such information. AVARK will, however, take reasonable steps
to ensure the accuracy and completeness of this information.</Paragraph>
                  <Paragraph style={styles.description}>- 3.2.4AVARK automatically enables the listing of Practitioners’ information
on its Website for every ‘Doctor’ or ‘Clinic’ added to a Practice using its
software. The Practitioner information listed on Website is displayed when
End-Users search for doctors on Website, and the Practitioner information
listed on Website is used by End-Users to request for doctor appointments.
Any personally identi able information of the Practitioners listed on the
Website is not generated by AVARK and is provided to AVARK by Practitioners
who wish to enlist themselves on the Website, or is collected by AVARK from
the public domain. AVARK displays such information on its Website on an as-
is basis making no representation or warranty on the accuracy or
completeness of the information. As such, we strongly encourage
Practitioners to check the accuracy and completeness of their information
from time to time, and inform us immediately of any discrepancies, changesor updates to such information. AVARK will, however, take reasonable steps
to ensure the accuracy and completeness of this information.</Paragraph>

                  <Paragraph style={styles.subheading}>3.3END-USERS NOTE:This section applies to all End-Users.</Paragraph>


                  <Paragraph style={styles.description}>- 3.3.1As part of the registration/application creation and submission process
that is available to End-Users on this Website, certain information, including
Personal Information or Sensitive Personal Data or Information is collected
from the End-Users.</Paragraph>
                  <Paragraph style={styles.description}>- 3.3.2All the statements in this Privacy Policy apply to all End-Users, and all
End-Users are therefore required to read and understand the privacy
statements set out herein prior to submitting any Personal Information or
Sensitive Personal Data or Information to AVARK, failing which they are
required to leave the AVARK immediately.</Paragraph>
                  <Paragraph style={styles.description}>- 3.3.3If you have inadvertently submitted any such information to AVARK
prior to reading theprivacy statements set out herein, and you do not agree
with the manner in which such information is collected, processed, stored,
used or disclosed, then you may access, modify and delete such information
by using options provided on the Website. In addition, you can, by sending
an email to privacy@AVARK.com, inquire whether AVARK is in possession of
your personal data, and you may also require AVARK to delete and destroy all
such information.</Paragraph>
                  <Paragraph style={styles.description}>- 3.3.4End-Users’ personally identi able information, which they choose to
provide on the Website is used to help the End-Users describe/identify
themselves. Other information that does not personally identify the End-
Users as an individual, is collected by AVARK from End-Users (such as,
patterns of utilization described above) and is exclusively owned by AVARK.
AVARK may also use such information in an aggregated or non-personally
identi able form for research, statistical analysis and business intelligence
purposes, and may sell or otherwise transfer such research, statistical or
intelligence data in an aggregated or non-personally identi able form to
third parties and af liates. In particular, AVARK reserves with it the right to
use anonymized End-User demographics information and anonymized End-
User health information for the following purposes:</Paragraph>

                  <Paragraph style={styles.subdescription}>- Analyzing software usage patterns for improving product design and
utility.</Paragraph>
                  <Paragraph style={styles.subdescription}>- Analyzing such information for research and development of new
technologies.</Paragraph>
                  
                  <Paragraph style={styles.subdescription}>- Using analysis of such information in other commercial product
offerings of AVARK.</Paragraph>
                  <Paragraph style={styles.subdescription}>- Sharing analysis of such information with third parties for
commercial use.</Paragraph>

                  <Paragraph style={styles.description}>- 3.3.5AVARK will communicate with the End-Users through email, phone
and notices posted on the Website or through other means available
through the service, including text and other forms of messaging. The End-
Users can change their e-mail and contact preferences at any time by
logging into their "Account" at www.AVARK.com and changing the account
settings.</Paragraph>
                  <Paragraph style={styles.description}>- 3.3.6At times, AVARK conducts a User survey to collect information about
End-Users' preferences. These surveys are optional and if End-Users choose
to respond, their responses will be kept anonymous. Similarly, AVARK may
offer contests to qualifying End-Users in which we ask for contact and
demographic information such as name, email address and mailing address.The demographic information that AVARK collects in the registration process
and through surveys is used to help AVARK improve its Services to meet the
needs and preferences of End-Users.</Paragraph>
                  <Paragraph style={styles.description}>- 3.3.7AVARK may keep records of electronic communications and telephone
calls received andmade for making appointments or other purposes for the
purpose of administration of Services, customer support, research and
development and for better listing of Practitioners.</Paragraph>
                  <Paragraph style={styles.description}>- 3.3.8All AVARK employees and data processors, who have access to, and are
associated with the processing of sensitive personal data or information, are
obliged to respect the con dentiality of every End-Users’ Personal
Information or Sensitive Personal Data and Information. AVARK has put in
place procedures and technologies as per good industry practices and in
accordance with the applicable laws, to maintain security of all personal data
from the point of collection to the point of destruction. Any third-party data
processor to which AVARK transfers Personal Data shall have to agree to
comply with those procedures and policies, or put in place adequate
measures on their own.</Paragraph>
                  <Paragraph style={styles.description}>- 3.3.9AVARK may also disclose or transfer End-Users’ personal and other 
information provided by a User, to a third party as part of reorganization or a
sale of the assets of a AVARK corporation division or company. Any third partyto which AVARK transfers or sells its assets to will have the right to continue
to use the personal and other information that End-Users provide to us, in
accordance with the Terms of Use</Paragraph>
                  <Paragraph style={styles.description}>- 3.3.10To the extent necessary to provide End-Users with the Services,
AVARK may provide their Personal Information to third party contractors who
work on behalf of or with AVARK to provide End-Users with such Services, to
help AVARK communicate with End-Users or to maintain the Website or
independent third party service providers to process payment instructions
including providing a payment deferral facility to End-Users in relation to the
Services. These third-party service providers have access to information
needed to process payments, but may not use it for other purposes.
Generally these contractors do not have any independent right to share this
information, however certain contractors who provide services on the
Website, including the providers of online communications services, may
use and disclose the personal information collected in connection with the
provision of these Services in accordance with their own privacy policies. In
such circumstances, you consent to us disclosing your Personal Information
to contractors, solely for the intended purposes only.</Paragraph>

                  <Paragraph style={styles.subheading}>3.4CASUAL VISITORS NOTE:</Paragraph>


                  <Paragraph style={styles.description}>- 3.4.1No sensitive personal data or information is automatically collected by
AVARK from any casual visitors of this website, who are merely perusing the
Website.</Paragraph>
                  <Paragraph style={styles.description}>- 3.4.2Nevertheless, certain provisions of this Privacy Policy are applicable to
even such casual visitors, and such casual visitors are also required to read
and understand the privacy statements set out herein, failing which they are
required to leave this Website immediately.</Paragraph>
                  <Paragraph style={styles.description}>- 3.4.3If you, as a casual visitor, have inadvertently browsed any other page
of this Website prior to reading the privacy statements set out herein, and
you do not agree with the manner in which such information is obtained,
collected, processed, stored, used, disclosed or retained, merely quitting this
browser application should ordinarily clear all temporary cookies installed by
AVARK. All visitors, however, are encouraged to use the “clear cookies”
functionality of their browsers to ensure such clearing / deletion, as AVARK
cannot guarantee, predict or provide for the behaviour of the equipment of
all the visitors of the Website.</Paragraph>
                  <Paragraph style={styles.description}>- 3.4.4You are not a casual visitor if you have willingly submitted any
personal data or information to AVARK through any means, including email,
post or through the registration process on the Website. All such visitors will
be deemed to be, and will be treated as, Users for the purposes of thisPrivacy Policy, and in which case, all the statements in this Privacy Policy
apply to such persons.</Paragraph>

                  <Title style={styles.textColor}>4.CONFIDENTIALITY AND SECURITY</Title>
                  <Paragraph style={styles.subheading}>4.1Your Personal Information is maintained by AVARK in electronic form on its
equipment, and on the equipment of its employees. Such information may also be
converted to physical form from time to time. AVARK takes all necessary precautions
to protect your personal information both online and off-line, and implements
reasonable security practices and measures including certain managerial, technical,
operational and physical security control measures that are commensurate with
respect to the information being collected and the nature of AVARK’s business.</Paragraph>
                  <Paragraph style={styles.subheading}>4.2No administrator at AVARK will have knowledge of your password. It is important
for you to protect against unauthorized access to your password, your computer and
your mobile phone. Be sure to log off from the Website when nished. AVARK does
not undertake any liability for any unauthorised use of your account and password.
If you suspect any unauthorized use of your account, you must immediately notify
AVARK by sending an email to support@AVARK.com You shall be liable to indemnify
AVARK due to any loss suffered by it due to such unauthorized use of your account
and password.</Paragraph>
                  <Paragraph style={styles.subheading}>4.3AVARK makes all User information accessible to its employees, agents or
partners and third parties only on a need-to-know basis, and binds only its
employees to strict con dentiality obligations.</Paragraph>
                  <Paragraph style={styles.subheading}>4.4Part of the functionality of AVARK is assisting the doctors to maintain and
organise such information. AVARK may, therefore, retain and submit all such records
to the appropriate authorities, or to doctors who request access to such information.</Paragraph>
                  <Paragraph style={styles.subheading}>4.5Part of the functionality of the AVARK is assisting the patients to access
information relating to them. AVARK may, therefore, retain and submit all such
records to the relevant patients, or to their doctors.</Paragraph>
                  <Paragraph style={styles.subheading}>4.6Notwithstanding the above, AVARK is not responsible for the con dentiality,
security or distribution of your Personal Information by our partners and third
parties outside the scope of our agreement with such partners and third parties.
Further, AVARK shall not be responsible for any breach of security or for any actions
of any third parties or events that are beyond the reasonable control of AVARK
including but not limited to, acts of government, computer hacking, unauthorised
access to computer data and storage device, computer crashes, breach of security
and encryption, poor quality of Internet service or telephone service of the User etc.</Paragraph>

                  <Title style={styles.textColor}>5.CHANGE TO PRIVACY POLICY</Title>


                  <Paragraph style={styles.subheading}>AVARK may update this Privacy Policy at any time, with or without advance notice. In the
event there are signi cant changes in the way AVARK treats User’s personally identi able
information, or in the Privacy Policy itself, AVARK will display a notice on the Website or send Users an email, as provided for above, so that you may review the changed terms prior
to continuing to use the Services. As always, if you object to any of the changes to our terms,
and you no longer wish to use the Services, you may contact support@AVARK.com to
deactivate your account. Unless stated otherwise, AVARK’s current Privacy Policy applies to
all information that AVARK has about you and your account.
If a User uses the Services or accesses the Website after a notice of changes has been sent
to such User or published on the Website, such User hereby provides his/her/its consent to
the changed terms.</Paragraph>
                  
                  <Title style={styles.textColor}>6.CHILDREN'S AND MINOR'S PRIVACY</Title>
                  <Paragraph style={styles.subheading}>AVARK strongly encourages parents and guardians to supervise the online activities of their
minor children and consider using parental control tools available from online services and
software manufacturers to help provide a child-friendly online environment. These tools
also can prevent minors from disclosing their name, address, and other personally
identi able information online without parental permission. Although the AVARK Website
and Services are not intended for use by minors, AVARK respects the privacy of minors who
may inadvertently use the internet or the mobile application.</Paragraph>

                  <Title style={styles.textColor}>7.CONSENT TO THIS POLICY</Title>
                  <Paragraph style={styles.subheading}>You acknowledge that this Privacy Policy is a part of the Terms of Use of the Website and the
other Services, and you unconditionally agree that becoming a User of the Website and its
Services signi es your (i) assent to this Privacy Policy, and (ii) consent to AVARK using,
collecting, processing and/or disclosing your Personal Information in the manner and for
the purposes set out in this Privacy Policy. Your visit to the Website and use of the Services is
subject to this Privacy Policy and the Terms of Use.</Paragraph>

                  <Title style={styles.textColor}>8.ADDRESS FOR PRIVACY QUESTIONS</Title>
                  <Paragraph style={styles.subheading}>Should you have questions about this Privacy Policy or AVARK's information collection, use
and disclosure practices, you may contact, the Data Protection Of cer appointed by AVARK
in accordance with the provisions of PDPA. We will use reasonable efforts to respond
promptly to any requests, questions or concerns, which you may have regarding our use of
your personal information. If you have any grievance with respect to our use of your
information, you may communicate such grievance to the Data Protection Of cer:</Paragraph>
                  <Paragraph style={styles.description}>Name: Shashank Bhawsar </Paragraph>
                  <Paragraph style={styles.description}>AVARK Private Limited Pvt Ltd</Paragraph>
                  <Paragraph style={styles.description}>A-81, Vistara City, Nipania, Indore</Paragraph>
                  <Paragraph style={styles.description}>Phone: 8817837860</Paragraph>
                  <Paragraph style={styles.description}>Email: Support@AVARK.com</Paragraph>


                  <Title style={styles.textColor}>SCHEDULE</Title>
                  <Paragraph style={styles.subheading}>Indicative List of Information by Nature of Service</Paragraph>
                  
                  <Paragraph style={styles.description}>- 1.End-Users using the Website by registering for an account on the Website or
‘AVARK’ mobile application:</Paragraph>
                  <Paragraph style={styles.subdescription}>You can create an account by giving us information regarding your [name, mobile number,
email address], and such other information as requested on the End-User registration page.
This is to enable us to provide you with the facility to use the account to book your
appointments and store other health related information.
Against every Practitioner listed in AVARK.com, you may see a ‘show number’ option. When
you choose this option, you choose to call the number through a free telephony service
provided by AVARK, and the records of such calls are recorded and stored in AVARK’s
servers. Such call will have an IVR message stating the purpose of recording your calls and
your consent to such recordings which are dealt with as per the Privacy Policy. If you choose
not to consent to recording of such call, AVARK hereby reserves the right to not provide you
the Services for which such Personal Information is sought. Such records are dealt with only
in accordance with this Privacy Policy.</Paragraph>


                  

                  <Paragraph style={styles.description}>- 2.End-Users using the Website without registering for an account on the
Website or ‘AVARK’ mobile application (i.e., ‘Guest’ End-User):</Paragraph>
                  <Paragraph style={styles.subdescription}>You can use the Website without registering for an account, but to book an appointment,
you may be asked certain information (including your [mobile number], and such other
information as requested when you choose to use the Services without registration) to
con rm the appointment.
Against every Practitioner listed in AVARK.com, you may see a ‘show number’ option. When
you choose this option, you choose to call the number through a free telephony service
provided by AVARK, and the records of such calls are recorded and stored in AVARK’s
servers. Such call will have an IVR message stating the purpose of recording your calls and your consent to such recordings which are dealt with as per the Privacy Policy. If you choose
not to consent to recording of such call, AVARK hereby reserves the right to not provide you
the Services for which such Personal Information is sought. Such records are dealt with only
in accordance with this </Paragraph>

                  <Paragraph style={styles.description}>- 3.Practitioner availing of the free listing service on the Website or ‘AVARK’
mobile application by registering for an account:</Paragraph>
                  <Paragraph style={styles.subdescription}>As a Practitioner, you may be required to provide us with information regarding your
[name, mobile number, email address], and such other information as requested on
the Practitioner registration page to create an account. AVARK may send email and/or SMS
con rmations or other communications to End-Users in connection with their bookings,
appointments or other interactions with you, if such interactions have been facilitated by
AVARK.</Paragraph>

                  <Paragraph style={styles.description}>- 4.Practitioner availing of the free listing service on the Website or ‘AVARK’
mobile application without registering for an account:</Paragraph>
                  <Paragraph style={styles.subdescription}>As a Practitioner, you may avail of the listing service without registering for an account by
providing information regarding your [name, mobile number, email address], and such
other information as requested by any of AVARK’s employees or agents who contact you in
person or by telephone. In such event, AVARK will maintain this information if and until you
choose to register for an account, for which AVARK may contact you from time to time.
AVARK will, after such information is collected from you, send you a con rmation email
con rming the information provided and the fact that you will be listed on the Website. In
the event you do not wish to be so listed on the Website, please inform AVARK immediately
at support@AVARK.com</Paragraph>

                  <Paragraph style={styles.description}>- 5.Practitioners using the ‘Ray’ and/or ‘Tab’ products:</Paragraph>
                  <Paragraph style={styles.subdescription}>You will be required to create an account and may be required to provide AVARK with
information regarding your [name, mobile number, email address, digital signature], and
such other information as requested by AVARK on the Ray and/or Tab Practitioner
registration page, in order to complete your registration. Practitioner agrees to the use of
the digital signature in the prescription and clinical notes as the regulatory requirements.
AVARK will not access the said digital signature for any other purpose under any
circumstance. Upon registration, AVARK will access non-personally identi able information
of your patients from your patient records. You agree to make your patients fully aware of such access.
AVARK reserves the right to extend and withdraw ‘ABS’ (also known as Instant) functionality
to you at its sole discretion, based on the number of End-User appointments being
honoured by you. The extension or withdrawal of such facility shall be intimated to you by
AVARK.
You have an option under these products to switch on ‘End-User Feedback’. This will mean
that you are giving one or more patients’ contact details to AVARK’s feedback system. End-
Users may choose to send feedback anonymously too, in which case you agree that you
have no objection to such anonymous feedback. The feedback system will then send an
SMS and email to the patient(s) asking for feedback which may then be published on the
Website. You agree to make your patients fully aware of the possibility of their receiving
such feedback queries.</Paragraph>

                  <Paragraph style={styles.description}>- 6.Practitioners using the ‘AVARK Reach’ product:</Paragraph>
                  <Paragraph style={styles.subdescription}>You will be required to create an account and may be required to provide AVARK with
information regarding your [name, mobile number, email address], and such other
information as requested by AVARK on the ‘AVARK Reach’ Practitioner registration page, in
order to complete your registration.</Paragraph>

                  <Paragraph style={styles.description}>- 7.End-Users and Practitioners using the Consult platform.</Paragraph>
                  <Paragraph style={styles.subdescription}>You may be required to create an account and may be required to provide AVARK with
information such as your name, mobile number, email address, and such other information
as requested by AVARK on the AVARK Consult registration page in order to complete your
registration.</Paragraph>

                  
                </List.Section>

              <Paragraph style={styles.textColor}>
              </Paragraph>
          </ScrollView>
        </SafeAreaView>
    );
};

export default PrivacyPage;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal:5,
    marginVertical:10,
  },
  appHeader:{
    backgroundColor:'#00B2B6',
  },
  headerLogoContainer:{
    justifyContent: "center",
    alignItems: "center",
  },
  logoText:{
    color:'#ffffff',
    textAlign:'center',
    fontSize:16,
    fontWeight: 'bold'
  },
  containerView: {
    margin: 0,
    marginTop: 0
  },
  textColor: {
    color: '#000000'
  },
  textBold: {
    fontWeight: 'bold'
  },
  subheading: {
    color: '#000000',
    fontSize:16,
    marginLeft: 15
  },
  description: {
    color: '#000000',
    marginLeft: 35
  },
  subdescription: {
    color: '#000000',
    marginLeft: 45
  },
});
