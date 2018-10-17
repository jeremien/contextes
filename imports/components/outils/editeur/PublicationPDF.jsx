import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: 'red'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

const MyDocument = () => (
    <Document>
        <Page size='A4' style={styles.page}>
            <View style={styles.section}>
                <Text>
                    section 1
                </Text>
            </View>
            <View style={styles.section}>
                <Text>
                    section 2
                </Text>
            </View>
        </Page>
    </Document>
);;

export default MyDocument;