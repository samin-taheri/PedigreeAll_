import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator, Platform, Text, Alert } from 'react-native'
import { Global } from './Global'
import { DataTable } from 'react-native-paper';
import Icon from "react-native-vector-icons/FontAwesome5";
import Flag from "react-native-flags";

function HorseDetailScreenTailFemale({ BackButton, navigation, route }) {
    const [time, setTime] = React.useState(true);
    const [getTailFemale, setTailFemale] = React.useState();
    const { HORSE_ID } = route.params;

    const readTailFemale = async () => {
        try {
            if (Global.Token !== null) {
                fetch('https://api.pedigreeall.com/TailFemale/GetTailFemale?p_iHorseId=' + HORSE_ID, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + Global.Token,
                    },
                }).then((response) => response.json())
                    .then((json) => {
                        if (json !== null) {
                            setTailFemale(json.m_cData)
                            setTime(false);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
            else {
                console.log("Basarisiz")
            }
        }
        catch (e) {
            console.log("GetTailFemale Error")
        }
    };

    React.useEffect(() => {
        readTailFemale();
    }, [])


    const alertDialog = (messageTitle, message) =>
        Alert.alert(
            messageTitle,
            message,
            [
                {
                    text: "OK",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ],
            { cancelable: false }
        );


    return (
        <View style={styles.Container} showsVerticalScrollIndicator={true}>

            {time ?
                <ActivityIndicator style={styles.Activity} size="large" color="rgba(52, 77, 169, 0.6)" />
                :
                <>
                 <ScrollView vertical={true}>
                    {getTailFemale !== undefined &&

                        <ScrollView horizontal={true}>


                            <DataTable>

                                <DataTable.Header removeClippedSubviews={true}>
                                    <DataTable.Title style={{ width: 350 }}>Name</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.4%'}]}>Class</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.4%'}]}>Point</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.4%'}]}>Earning</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.3%'}]}>Fam</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.3%'}]}>Color</DataTable.Title>
                                    <DataTable.Title style={{ width: 400, left: '0.3%' }}>Sire</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.7%'}]}>Birth D.</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.7%'}]}>Start</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.6%'}]}>1st</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.6%'}]}>1st %</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.5%'}]}>2nd</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.5%'}]}>2nd %</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.4%'}]}>3rd</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.4%'}]}>3rd %</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.4%'}]}>4th</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.4%'}]}>4th %</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.3%'}]}>Price</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.3%'}]}>Dr. RM</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.2%'}]}>ANZ</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.2%'}]}>PedigreeAll</DataTable.Title>
                                    <DataTable.Title style={{ width: 150, left: '0.1%' }}>Owner</DataTable.Title>
                                    <DataTable.Title style={{ width: 150, left: '0.1%' }}>Breeder</DataTable.Title>
                                    <DataTable.Title style={{ width: 150, left: '0.1%' }}>Coach</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.1%'}]}>Dead</DataTable.Title>
                                    <DataTable.Title style={[styles.DataTableText, {left: '0.1%'}]}>Update D.</DataTable.Title>
                                </DataTable.Header>

                                {getTailFemale.HORSE_INFO_LIST.map((item, index) => (

                                    <DataTable.Row centered={true} key={index}>
                                        <DataTable.Cell style={{ top: Platform.OS == 'ios' ? '8%': '0%' , bottom: Platform.OS == 'ios' ? '0%': '4%'}}>
                                            <Flag code={item.ICON.toUpperCase()} size={16} />
                                        </DataTable.Cell>
                                        <DataTable.Cell
                                            onPress={() => { alertDialog("Name", item.HORSE_NAME) }}
                                            style={{ width: 350, left: '0.4%' }}>
                                            {item.HORSE_NAME}
                                        </DataTable.Cell>

                                        <DataTable.Cell style={styles.DataTableText}>{item.WINNER_TYPE_OBJECT.WINNER_TYPE_EN}</DataTable.Cell>


                                        <DataTable.Cell style={styles.DataTableText} >{item.POINT}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText} >{item.EARN} {item.EARN_ICON}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText} >{item.FAMILY_TEXT}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText}>{item.COLOR_TEXT}</DataTable.Cell>
                                        <DataTable.Cell style={{ top: Platform.OS == 'ios' ? '8%': '0%' , bottom: Platform.OS == 'ios' ? '0%': '4%'}}>
                                            <Flag code={item.FATHER_ICON.toUpperCase()} size={16} />
                                        </DataTable.Cell>
                                        <DataTable.Cell
                                            onPress={() => { alertDialog("Sire", item.FATHER_NAME) }}
                                            style={{ width: 400 , left: '0.4%' }}>
                                            {item.FATHER_NAME}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText}>{item.HORSE_BIRTH_DATE_TEXT}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText} >{item.START_COUNT}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText} >{item.FIRST}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText} >{item.FIRST_PERCENTAGE} %</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText} >{item.SECOND}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText} >{item.SECOND_PERCENTAGE} %</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText} >{item.THIRD}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText} >{item.THIRD_PERCENTAGE} %</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText} >{item.FOURTH}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText} >{item.FOURTH_PERCENTAGE} %</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText} >{item.PRICE} {item.PRICE_ICON}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText} >{item.RM}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText} >{item.ANZ}</DataTable.Cell>
                                        <DataTable.Cell style={styles.DataTableText} >{item.PA}</DataTable.Cell>
                                        <DataTable.Cell
                                            onPress={() => { alertDialog("Owner", item.OWNER) }}
                                            style={{ width: 150 }}>
                                            {item.OWNER}
                                        </DataTable.Cell>
                                        <DataTable.Cell
                                            onPress={() => { alertDialog("Breeder", item.BREEDER) }}
                                            style={{ width: 150 }}>
                                            {item.BREEDER}
                                        </DataTable.Cell>
                                        <DataTable.Cell
                                            onPress={() => { alertDialog("Coach", item.COACH) }}
                                            style={{ width: 150 }}>
                                            {item.COACH}
                                        </DataTable.Cell>
                                        {item.IS_DEAD ?
                                            <>
                                                <DataTable.Cell style={styles.DataTableText}>DEAD</DataTable.Cell>
                                            </>
                                            :
                                            <>
                                                <DataTable.Cell style={styles.DataTableText}>ALIVE</DataTable.Cell>
                                            </>
                                        }
                                        <DataTable.Cell style={styles.DataTableText}>{item.EDIT_DATE_TEXT}</DataTable.Cell>
                                    </DataTable.Row>



                                ))}

                            </DataTable>


                        </ScrollView>

                    }
                    </ScrollView>
                </>
            }
        </View>
    )
}
export default HorseDetailScreenTailFemale;
const styles = StyleSheet.create({
    DataTableText: {
        width: 100,
    },
    Container:{
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    Activity: {
        top: '40%', shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.27,
        elevation: 4, 
        backgroundColor: '#fff', 
        width: 50, 
        height: 50, 
        paddingLeft: Platform.OS == 'ios' ? 3: 0,
        borderRadius: 30, 
        alignItems: 'center', 
        justifyContent: 'center', 
        alignSelf: 'center'
    },
})