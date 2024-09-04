import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

const TermsAndConditions = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Terms and Conditions</Text>
            <Text>Last updated: July 31, 2024</Text>
            <Text>
                Please read these terms and conditions carefully before using Our Service.
            </Text>

            <Text style={styles.subheader}>Interpretation and Definitions</Text>
            <Text style={styles.subheader}>Interpretation</Text>
            <Text>
                The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
            </Text>

            <Text style={styles.subheader}>Definitions</Text>
            <Text>For the purposes of these Terms and Conditions:</Text>
            <Text style={styles.listItem}>
                <Text style={styles.bold}>Affiliate</Text> means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest, or other securities entitled to vote for election of directors or other managing authority.
            </Text>
            <Text style={styles.listItem}>
                <Text style={styles.bold}>Country</Text> refers to Bihar, India.
            </Text>
            <Text style={styles.listItem}>
                <Text style={styles.bold}>Company</Text> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to B Online Market Owner.
            </Text>
            <Text style={styles.listItem}>
                <Text style={styles.bold}>Device</Text> means any device that can access the Service such as a computer, a cellphone, or a digital tablet.
            </Text>
            <Text style={styles.listItem}>
                <Text style={styles.bold}>Service</Text> refers to the Application.
            </Text>
            <Text style={styles.listItem}>
                <Text style={styles.bold}>Terms and Conditions</Text> (also referred to as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.
            </Text>
            <Text style={styles.listItem}>
                <Text style={styles.bold}>You</Text> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
            </Text>

            <Text style={styles.subheader}>Acknowledgment</Text>
            <Text>
                These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
            </Text>
            <Text>
                Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.
            </Text>
            <Text>
                By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.
            </Text>
            <Text>
                You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.
            </Text>
            <Text>
                Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.
            </Text>

            <Text style={styles.subheader}>User Accounts</Text>
            <Text>
                When You create an account with Us, You must provide Us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account on Our Service.
            </Text>
            <Text>
                You are responsible for safeguarding the password that You use to access the Service and for any activities or actions under Your password, whether Your password is with Our Service or a third-party social media service.
            </Text>
            <Text>
                You agree not to disclose Your password to any third party. You must notify Us immediately upon becoming aware of any breach of security or unauthorized use of Your account.
            </Text>

            <Text style={styles.subheader}>Intellectual Property</Text>
            <Text>
                The Service and its original content (excluding Content provided by You or other users), features and functionality are and will remain the exclusive property of the Company and its licensors.
            </Text>
            <Text>
                The Service is protected by copyright, trademark, and other laws of both the Country and foreign countries.
            </Text>
            <Text>
                Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of the Company.
            </Text>

            <Text style={styles.subheader}>Links to Other Websites</Text>


        </ScrollView>)
}








const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subheader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    subsubheader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 3,
    },
    bold: {
        fontWeight: 'bold',
    },
    listItem: {
        marginVertical: 3,
    },
    link: {
        color: 'blue',
    },
});

export default TermsAndConditions;
