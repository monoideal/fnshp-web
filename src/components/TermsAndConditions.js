import React, { useEffect } from 'react';
import history from 'lib/history';
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    lineHeight: '1.4',
  },
  header: {
    color: theme.palette.black.main,
    fontWeight: 'bold',
    display: 'flex',
    padding: '80px 0px 60px 0px',
    fontSize: '40px',
    fontVariant: 'all-petite-caps',
  },
  updatedOn: {
    color: theme.palette.black.main,
    margin: '0px 10px 10px 10px',
  },
  terms: {
    color: theme.palette.black.main,
    margin: '10px 10px 10px 10px',
    fontWeight: 'bold',
  },
  condition: {
    color: theme.palette.black.main,
    margin: '10px 10px 10px 10px',
  },
  subcondition: {
    color: theme.palette.black.main,
    margin: '10px 10px 10px 70px',
  },
  fontLink: {
    textDecoration: 'underline',
    color: 'blue',
    cursor: 'pointer',
  },
  fontBold: {
    fontWeight: 'bold',
  },
}));

export default function TermsAndConditions() {
  const classes = useStyles();
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <Box className={classes.header}>Terms of Use</Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.updatedOn}>Last updated on: May 15, 2020</Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.terms}>1. Services and Acceptance</Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.condition}>
            Fanship and Fanship’s website, https://www.Fanship.fan (the
            “Website”), are administered by Prescient Innovations Inc
            (“Prescient”) located at 69 Yonge Street, Suite 1100, Toronto, ON
            M5E 1K3 Canada. “Fanship” “We” “Us” mean Prescient, “our” means
            Prescient’s.
          </Box>
          <Box className={classes.condition}>
            The services offered by Fanship include various products and
            services to help you recommend, showcase, buy, and/or learn of
            books. Any such service offered by Fanship is referred to in these
            Terms of Use as the “Service”, collectively “the Services”.
          </Box>
          <Box className={classes.condition}>
            By using any Service, including browsing the Website, sending or
            submitting a recommendation or buying a book, you are agreeing to be
            bound by the following terms and conditions (the “Terms of Use”),
            including{' '}
            <a
              onClick={() => history.push('/policy')}
              className={classes.fontLink}
            >
              our Privacy Policy
            </a>
            .{' '}
            <span className={classes.fontBold}>
              If you do not agree to the Terms of Use, or any document referred
              to in the Terms of Use, including
            </span>{' '}
            <a
              onClick={() => history.push('/policy')}
              className={classes.fontLink}
            >
              our Privacy Policy
            </a>
            ,{' '}
            <span className={classes.fontBold}>
              cease using the Website and all other Services
            </span>{' '}
            Fanship may amend these Terms of Use at any time, with or without
            notice, for any reason, and at its sole discretion, by posting the
            relevant amended and restated Terms of Use on the Website, available
            at https://www.Fanship.fan/legal/terms with such amendments to the
            Terms of Use effective as of the date of posting. Your continued use
            of Services after the amended Terms of Use are posted to Fanship’s
            website constitutes your acceptance of the amended Terms of Use. If
            you do not agree to any changes to the Terms of Use, do not continue
            to use our Services.
            <span className={classes.fontBold}>
              All purchases are non-refundable.
            </span>
          </Box>
          <Box className={classes.condition}>
            Any new features or tools which are added to the current Services
            shall be also subject to the Terms of Use. If you do not accept such
            amendments, you must cease use of our Services.
          </Box>
          <Box className={classes.condition}>
            In addition to these Terms of Use, you also agree to be bound by the
            third-party terms and policies applicable to services provided by
            Third Party Providers, as defined and linked in Section 16 of these
            Terms of Use. For the avoidance of doubt, Shopify, Plaid, and Auth0
            are Third Party Providers, respectively providing ecommerce,
            identity verification, and login authentication services, that
            process and collect users’ personal information. You grant Third
            Party Providers permission to access, collect and process your data
            and other Materials (as further defined in Section 3 of these Terms
            of Use), and to take any other actions as required for the
            interoperation of the Third Party Service, as defined in Section 16
            of these Terms of Use, with the Services, and any exchange of data
            or other Materials or other interaction between you and the Third
            Party Provider is solely between you and such Third Party Provider.
            Fanship is not responsible for any disclosure, modification or
            deletion of your data or other Materials, or for any corresponding
            losses or damages you may suffer, as a result of a Third Party
            Service or the access, processing or handling by a Third Party
            Provider of your data or other Materials.
          </Box>
          <Box className={classes.condition}>
            All books on the Service are the exclusive property of the
            author/publisher or its licensors and are protected by copyright and
            other intellectual property laws. The download of, and access to any
            book is available only to the purchaser of the book and is intended
            only for this purchaser's personal and non-commercial use. Any other
            use of a book downloaded or accessed from our Services is strictly
            prohibited. Purchasers may not modify, transmit, publish,
            participate in the transfer or sale of, reproduce, create derivative
            works from, distribute, perform, display, or in any way exploit, any
            of the content of any book, in whole or in part. By downloading or
            otherwise accessing a book from our Services, the purchaser hereby
            acknowledges and agrees to these terms.
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.terms}>2. General Conditions</Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.condition}>
            You may not use the Services for any illegal or unauthorized purpose
            nor may you, in the use of the Service, violate any laws in your
            jurisdiction (including but not limited to copyright laws), the laws
            applicable to you in your jurisdiction, or the laws of Canada and
            the Provinces and Territories of Canada. You will comply with all
            applicable laws, rules and regulations in your use of Services and
            your performance of obligations under the Terms of Use.
          </Box>
          <Box className={classes.condition}>
            You agree not to reproduce, duplicate, copy, sell, resell or exploit
            any portion of the Services without the express prior written
            permission of Fanship.
          </Box>
          <Box className={classes.condition}>
            You shall not purchase search engine or other pay per click keywords
            (such as Google AdWords), or domain names that use Fanship or
            Fanship trademarks and/or variations and misspellings thereof.
          </Box>
          <Box className={classes.condition}>
            You understand that your data or your Materials may be transferred
            unencrypted and involve (a) transmissions over various networks; and
            (b) changes to conform and adapt to technical requirements of
            connecting networks or devices.
          </Box>
          <Box className={classes.condition}>
            The Services allow you to send certain communications, including by
            email or by short message service (SMS) messaging (for example, when
            sending a recommendation). You will only use the messaging Services
            in compliance with these Terms of Use, and the Governing Law (as
            defined in Section 13 of these Terms of Uses).
          </Box>
          <Box className={classes.condition}>
            The Terms of Use may be available in languages other than English.
            To the extent of any inconsistencies or conflicts between these
            English Terms of Use and Fanship’s Terms of Use available in another
            language, the most current English version of the Terms of Use at
            https://www.Fanship.fan/legal/terms will prevail.
          </Box>
          <Box className={classes.condition}>
            All the terms and provisions of the Terms of Use shall be binding
            upon and inure to the benefit of the parties to the Terms of Use and
            to their respective heirs, successors, permitted assigns and legal
            representatives. Fanship shall be permitted to assign these Terms of
            Use without notice to you or consent from you. You shall have no
            right to assign or otherwise transfer the Terms of Use, or any of
            your rights or obligations hereunder, to any third party without
            Fanship’s prior written consent, to be given or withheld in
            Fanship’s sole discretion.
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.terms}>3. Accounts </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.condition}>
            To register for a Fanship account (“Account”) you must provide your
            full legal name, a valid email address, and any other information
            indicated as required.
          </Box>
          <Box className={classes.condition}>
            You acknowledge that Fanship will use the email address you provide
            on opening an Account or as updated by you from time to time as the
            primary method for communication with you.
          </Box>
          <Box className={classes.condition}>
            You are responsible for keeping your account information, including
            password, secure. Fanship cannot and will not be liable for any loss
            or damage from your failure to maintain the security of your
            Account(s) and passwords.
          </Box>
          <Box className={classes.condition}>
            Your Account is nontransferable.
          </Box>
          <Box className={classes.condition}>
            You are responsible for all activity conducted through your
            Account(s) and for content such as photos, images, videos, graphics,
            biographical details, copy, reviews and all other written content,
            audio files, code, information, or data uploaded, collected,
            generated, stored, displayed, distributed, transmitted or exhibited
            on, through or in connection with your Account(s) (“Materials”). You
            warrant that the Materials are not libelous and do not and will not
            infringe any rights of third parties of any kind, e.g., copyrights,
            trademarks, tradenames, publicity, privacy, celebrity and
            personality rights.
          </Box>
          <Box className={classes.condition}>
            You may cancel your Account by clicking “Deactivate Account”
            followed by “Save changes”.
          </Box>
          <Box className={classes.condition}>
            Upon termination of the Services by either party for any reason
            Fanship will cease providing you with the Services and will
            terminate your Account, including any and all benefits except where
            otherwise stated in these Terms of Use.
          </Box>
          <Box className={classes.condition}>
            Without limiting any other remedies, Fanship may suspend or
            terminate your Account, in its sole discretion, if we suspect that
            you have engaged in fraudulent activity in connection with the use
            of the Services.
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.terms}>
            4. Fanship’s Rights and Points Expiry
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.condition}>
            We reserve the right to refuse a Service to anyone for any reason at
            any time.
          </Box>
          <Box className={classes.condition}>
            We reserve the right to modify or terminate the Services (or any
            part thereof, including your Account) at any time, with or without
            notice, for any reason, and at our sole discretion.
          </Box>
          <Box className={classes.condition}>
            Your Points may expire if you fail to earn or redeem any Points in
            any twelve (12) consecutive months.
          </Box>
          <Box className={classes.condition}>
            We may suspend or terminate the rewards program at any time upon
            sixty (60) days prior notice to you. Points that remain unredeemed
            as of the termination of the Program may automatically be cancelled
            without notice to you and may not subsequently be redeemed,
            transferred or converted.
          </Box>
          <Box className={classes.condition}>
            Should events beyond our control, such as strikes, acts of God,
            terrorism, civil disturbance, war or changes in economic or business
            conditions, materially affect our willingness to continue the
            rewards program as it is then constituted, the rewards program may
            be suspended or terminated, in whole or in part, and your points may
            be cancelled without prior notice to you and may not subsequently be
            redeemed, transferred or converted.
          </Box>
          <Box className={classes.condition}>
            We may, without notice to you, suspend or terminate your
            participation in the rewards program, cancel your points and/or
            close your account(s) upon: (i) fraud or abuse by you, or any
            holder/user of the account(s); (ii) misrepresentation of information
            to us; or (iii) failure by you to comply with these Terms.
          </Box>
          <Box className={classes.condition}>
            Termination of the Terms of Use shall be without prejudice to any of
            our rights which arose prior to the date of termination.
          </Box>
          <Box className={classes.condition}>
            Fanship shall not be liable to you or to any third party for any
            modification, price change, suspension or discontinuance of the
            Service.
          </Box>
          <Box className={classes.condition}>
            Not all Services and features are available in every jurisdiction
            and we are under no obligation to make any Services or features
            available in any jurisdiction.
          </Box>
          <Box className={classes.condition}>
            Fanship does not pre-screen Materials and it is in our sole
            discretion to refuse or remove any Materials from the Service.
          </Box>
          <Box className={classes.condition}>
            In the event of a dispute regarding Account ownership, we reserve
            the right to request documentation to determine or confirm Account
            ownership. Documentation may include, but is not limited to,
            government issued photo ID, the last four digits of the credit card
            on file, your status as an employee of an entity, etc .
          </Box>
          <Box className={classes.condition}>
            Fanship retains the right to determine, in our sole judgment,
            rightful Account ownership and transfer an Account to the rightful
            owner. If we are unable to reasonably determine the rightful owner,
            without prejudice to our other rights and remedies, Fanship reserves
            the right to temporarily disable an Account until resolution has
            been determined between the disputing parties.
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.terms}>5. Survival </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.condition}>
            Sections 1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14 16 will survive the
            termination or expiration of these Terms of Use.
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.terms}>6. Confidentiality </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.condition}>
            “Confidential Information” shall include, but shall not be limited
            to, any and all information associated with Fanship’s business and
            not publicly known, including specific business information,
            technical processes and formulas, software, customer lists,
            prospective customer lists, names, addresses and other information
            regarding customers and prospective customers, product designs,
            sales, costs (including any relevant processing fees), price lists,
            and other unpublished financial information, business plans and
            marketing data, and any other confidential and proprietary
            information, whether or not marked as confidential or proprietary.
            Fanship’s Confidential Information includes all information that you
            receive relating to us, or to the Services, that is not known to the
            general public including information related to our security program
            and practices.
          </Box>
          <Box className={classes.condition}>
            You agree to use the Confidential Information solely in accordance
            with these Terms of Use and not to disclose Confidential Information
            to third parties.
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.terms}>7. Beta Services </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.condition}>
            You are currently using a beta version of Fanship; from time to
            time, Fanship may also, in its sole discretion, invite you to use,
            on a trial basis, pre-release or beta features that are in
            development and not yet available to all merchants (collectively,
            “Beta Services”). Beta Services may be subject to additional terms
            and conditions, which Fanship will provide to you prior to your use
            of the Beta Services. Such Beta Services and all associated
            conversations and materials relating thereto will be considered
            Fanship’s Confidential Information and subject to the
            confidentiality provisions in this agreement. Without limiting the
            generality of the foregoing, you agree that you will not make any
            public statements or otherwise disclose your participation in the
            Beta Services without Fanship’s prior written consent. Fanship makes
            no representations or warranties that the Beta Services will
            function. Fanship may discontinue the Beta Services at any time in
            its sole discretion. Fanship will have no liability for any harm or
            damage arising out of or in connection with a Beta Service. The Beta
            Services may not work in the same way as a final version. Fanship
            may change or not release a final or commercial version of a Beta
            Service in our sole discretion.
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.terms}>8. Feedback and Reviews </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.condition}>
            Fanship welcomes any ideas and/or suggestions regarding improvements
            or additions to the Services. Under no circumstances shall any
            disclosure of any idea, suggestion or related material or any review
            of the Services, Third Party Services or any Third Party Provider
            (collectively, “Feedback") to Fanship be subject to any obligation
            of confidentiality or expectation of compensation. By submitting
            Feedback to Fanship (whether submitted directly to Fanship or posted
            on any Fanship hosted forum or page), you waive any and all rights
            in the Feedback and agree that Fanship is free to implement and use
            the Feedback if desired, as provided by you or as modified by
            Fanship, without obtaining permission or license or additional
            waiver from you or from any third party. Any reviews of a Third
            Party Service or Third Party Provider that you submit to Fanship
            must be accurate to the best of your knowledge, and must not be
            illegal, obscene, threatening, defamatory, invasive of privacy,
            infringing of intellectual property rights, or otherwise injurious
            to third parties or objectionable. Fanship reserves the right (but
            not the obligation) to remove or edit Feedback of Third Party
            Services or Third Party Providers, but does not regularly inspect
            posted Feedback.
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.terms}>9. Purchases of books</Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.condition}>
            All prices shown on the Website are exclusive of any transaction
            taxes. Prescient will levy and collect any applicable transaction
            taxes, including Goods and Services Tax (“GST/HST”), Quebec Sales
            Tax or any other transaction tax that it is legally required to levy
            and collect on its sales of books. Exemptions from any transaction
            tax must be supported by documentation that is acceptable to the
            applicable tax authority. Risk of loss for a purchase of a book
            transfers when the digital content is downloaded or accessed.
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.terms}>10. Rights of Third Parties </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.condition}>
            Save for Fanship and its affiliates, Account holders or anyone
            accessing Fanship Services pursuant to these Terms of Use, unless
            otherwise provided in these Terms of Use, no person or entity who is
            not a party to these Terms of Use shall have any right to enforce
            any term of these Terms of Use, regardless of whether such person or
            entity has been identified by name, as a member of a class or as
            answering a particular description. For the avoidance of doubt, this
            shall not affect the rights of any permitted assignee or transferee
            of these Terms.
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.terms}>11. Privacy & Data Protection </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.condition}>
            Fanship is firmly committed to protecting the privacy of your
            personal information. By using the Service, you acknowledge and
            agree that Fanship’s collection, usage and disclosure of this
            personal information is governed by{' '}
            <a
              onClick={() => history.push('/policy')}
              className={classes.fontLink}
            >
              our Privacy Policy
            </a>
            .
          </Box>
          <Box className={classes.condition}>
            Questions about the Privacy Policy should be sent to Fanship Support
            at{' '}
            <a href="mailto:privacy@prescient.com" className={classes.fontLink}>
              privacy@prescient.com
            </a>
            .
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.terms}>12. Limitation of Liability </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.condition}>
            You expressly understand and agree that, to the full extent
            permitted by applicable laws, Fanship shall not be liable for any
            direct, indirect, incidental, special, consequential or exemplary
            damages, including damages for loss of profits, goodwill, use, data
            or other intangible losses resulting from the use of or inability to
            use a Service.
          </Box>
          <Box className={classes.condition}>
            To the full extent permitted by applicable laws, in no event shall
            Fanship or our suppliers/providers be liable for lost profits or any
            special, incidental or consequential damages arising out of or in
            connection with our Website, any other Services or these Terms of
            Use (however arising, including negligence). You agree to indemnify
            and hold us and (as applicable) our parent, subsidiaries,
            affiliates, Fanship partners, officers, directors, agents,
            employees, and suppliers harmless from any claim or demand,
            including reasonable attorneys’ fees, made by any third party due to
            or arising out of your breach of these Terms of Use or the documents
            it incorporates by reference, or your violation of any law or the
            rights of a third party.
          </Box>
          <Box className={classes.condition}>
            Your use of the Services is at your sole risk. The Services are
            provided on an “as is” and “as available” basis without any warranty
            or condition, express, implied or statutory.
          </Box>
          <Box className={classes.condition}>
            Fanship does not warrant that the Services will be uninterrupted,
            timely, secure, or error-free.
          </Box>
          <Box className={classes.condition}>
            Fanship does not warrant that the results that may be obtained from
            the use of the Services will be accurate or reliable or that the
            quality of any products, services, information, or other materials
            obtained or purchased by you through the Services will meet your
            expectations, or that any errors in the Services will be corrected.
          </Box>
          <Box className={classes.condition}>
            The Website contains links to third-party websites which are not
            under the control of Fanship. Fanship makes no representations
            whatsoever about any third-party website to which you may access
            through this Website. When you access a third-party website through
            this Website, you do so at your own risk, and Fanship is not
            responsible for the accuracy or reliability of any information,
            data, opinions, advice, or statements made on these sites. Links to
            third-party websites are provided on this Website merely as a
            convenience, and the inclusion of such links on this Website does
            not imply that Fanship endorses or accepts any responsibility for
            the content or uses or accesses of such websites.
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.terms}>13. Law </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.condition}>
            The Terms of Use shall be governed by and interpreted in accordance
            with the laws of the Province of Ontario and the laws of Canada
            applicable therein, without regard to principles of conflicts of
            laws (“Governing Law”). The United Nations Convention on Contracts
            for the International Sale of Goods will not apply to these Terms of
            Use and is hereby expressly excluded. The parties irrevocably and
            unconditionally submit to the exclusive jurisdiction of the courts
            of the Province of Ontario in the City of Toronto with respect to
            any dispute or claim arising out of or in connection with the Terms
            of Use. The United Nations Convention on Contracts for the
            International Sale of Goods will not apply to these Terms of Use and
            is hereby expressly excluded.
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.terms}>
            14. Complete Agreement and No Waiver{' '}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.condition}>
            The failure of Fanship to exercise or enforce any right or provision
            of the Terms of Use shall not constitute a waiver of such right or
            provision. The Terms of Use, including the documents it incorporates
            by reference, constitute the entire agreement between you and
            Fanship and govern your use of the Services and your Account,
            superseding any prior agreements between you and Fanship (including,
            but not limited to, any prior versions of the Terms of Use).
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.terms}>15. Severability </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.condition}>
            If any provision, or portion of the provision, in these Terms of Use
            is, for any reason, held to be invalid, illegal or unenforceable in
            any respect, then such invalidity, illegality or unenforceability
            will not affect any other provision (or the unaffected portion of
            the provision) of the Terms of Use, and the Terms of Use will be
            construed as if such invalid, illegal or unenforceable provision, or
            portion of the provision, had never been contained within the Terms
            of Use.
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.terms}>16. Third Party Providers </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.condition}>
            Fanship may from time to time enable third party software,
            applications (“Apps”), products, services or website links
            (collectively, “Third Party Services”). Your use of Third Party
            Services is solely between you and the applicable third party
            services provider (“Third Party Provider”). As stated in Section 1,
            in addition to these Terms of Use, you also agree to be bound by the
            additional terms applicable to services that are provided by the
            third party services provider (“Third Party Providers”).
          </Box>
          <Box className={classes.condition}>
            Any use by you of Third Party Services through the Services,
            including through the Website, is entirely at your own risk and
            discretion, and it is your responsibility to read the terms and
            conditions and/or privacy policies applicable to such Third Party
            Services before using them. Further to Section 1, you grant us
            permission to allow the applicable Third Party Providers, which may
            be located in other countries, to access your data and other
            Materials and to take any other actions as required for the
            interoperation of the Third Party Service with the Services.
          </Box>
          <Box className={classes.condition}>
            We do not provide any warranties or make representations to you with
            respect to Third Party Services. You acknowledge that Fanship has no
            control over Third Party Services and shall not be responsible or
            liable to you or anyone else for such Third Party Services.
          </Box>
          <Box className={classes.condition}>
            Shopify is a Third Party Service that is used within the Services.
            Your use of the Services is subject to your acceptance of the{' '}
            <a
              target="_blank"
              href="https://www.shopify.ca/legal/terms"
              className={classes.fontLink}
            >
              Shopify Terms of Use
            </a>{' '}
            and{' '}
            <a
              target="_blank"
              href="https://www.shopify.ca/legal/privacy"
              className={classes.fontLink}
            >
              Shopify Privacy Policy
            </a>{' '}
            as may be amended by Shopify from time to time.
          </Box>
          <Box className={classes.condition}>
            PLAID is a Third Party Service that is used within the Services.
            Your use of the Services is subject to your acceptance of the{' '}
            <a
              target="_blank"
              href="https://plaid.com/legal"
              className={classes.fontLink}
            >
              PLAID Terms of Use
            </a>{' '}
            and{' '}
            <a
              target="_blank"
              href="https://plaid.com/legal/#privacy-statement"
              className={classes.fontLink}
            >
              Privacy Policy
            </a>{' '}
            as may be amended by PLAID from time to time.
          </Box>
          <Box className={classes.condition}>
            Auth0 is a Third Party Service that is used within the Services.
            Your use of the Services is subject to your acceptance of the{' '}
            <a
              target="_blank"
              href="https://auth0.com/web-terms/"
              className={classes.fontLink}
            >
              Auth0 Terms of Use
            </a>{' '}
            and{' '}
            <a
              target="_blank"
              href="https://auth0.com/privacy/"
              className={classes.fontLink}
            >
              Privacy Policy
            </a>{' '}
            as may be amended by Auth0 from time to time.
          </Box>
          <Box className={classes.condition}>
            The relationship between you and any Third Party Provider is
            strictly between you and such Third Party Provider, and Fanship is
            not obligated to intervene in any dispute arising between you and a
            Third Party Provider.
          </Box>
          <Box className={classes.condition}>
            Under no circumstances shall Fanship be liable for any direct,
            indirect, incidental, special, consequential, punitive,
            extraordinary, exemplary or other damages whatsoever, that result
            from any Third Party Services or your relationship with any Third
            Party Provider. These limitations shall apply even if Fanship has
            been advised of the possibility of such damages. The foregoing
            limitations shall apply to the fullest extent permitted by
            applicable law.
          </Box>
          <Box className={classes.condition}>
            You agree to indemnify and hold us and (as applicable) our parent,
            subsidiaries, affiliates, Fanship partners, officers, directors,
            agents, employees, and suppliers harmless from any claim or demand,
            including reasonable lawyers’ fees, arising out of your use of a
            Third Party Service or your relationship with a Third Party
            Provider.
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.terms}>17. Permissions </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.condition}>
            Except as otherwise specified, the contents and all materials
            contained on this Website are copyright © 2019 Prescient. All rights
            reserved. Except as specifically permitted herein, no portion of the
            information on this Website may be reproduced or distributed in any
            form or by any means without the prior written permission of
            Prescient.
          </Box>
          <Box className={classes.condition}>
            The audio clip and video clip materials contained on this Website
            are protected under various laws. These materials are made available
            for access on this Website for non-commercial purposes only. Any
            reproduction, publication, further distribution or public exhibition
            of any of these materials provided on this Website, in whole or in
            part, is strictly prohibited. Any unauthorized use may subject the
            unauthorized user to civil liability and criminal prosecution.
          </Box>
          <Box className={classes.condition}>
            The Prescient and Fanships logos are protected by copyright and
            registered trademarks of Prescient, and may not be used or
            reproduced in any manner without Prescient’s prior written
            permission. All third-party trademarks, trade names or company names
            referenced on this Website are used for identification purposes only
            and are the property of their respective owners.
          </Box>
          <Box className={classes.condition}>
            Except as otherwise indicated elsewhere on this Website, you may
            view, copy, print and distribute any information available on this
            Website subject to the following conditions:
          </Box>
          <Box className={classes.subcondition}>
            The information may only be used for personal, informational,
            non-commercial purposes.
          </Box>
          <Box className={classes.subcondition}>
            The information may not be modified or altered in any way.
          </Box>
          <Box className={classes.subcondition}>
            Any copy of the information must include the copyright notice above
            and the notice “reproduced pursuant to Prescient’s website terms of
            use”.
          </Box>
          <Box className={classes.condition}>
            Prescient reserves the right to revoke the above permission at any
            time, and any use shall be discontinued immediately upon notice from
            Prescient.
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.terms}>18. Interpretation </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.condition}>
            All questions or disputes regarding the interpretation of these
            Terms will be resolved by us in our sole discretion.
          </Box>
          <Box className={classes.condition}>
            The division of these Terms into sections, subsections and other
            subdivisions, and the insertion of headings, are for convenience of
            reference only and should not affect their interpretation.
          </Box>
          <Box className={classes.condition}>
            Also, the word "including" means "including without limitations".
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
