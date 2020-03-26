import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList, View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';
import logoImg from '../../assets/logo.png';


export default function Details() {
  
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;

  const message = `Olá ${incident.name}, estou entrando em contato pois quero ajudar no caso "${incident.title}" com o valor de ${incident.value}`;
  const subject = `Herói do caso: ${incident.title}`;

  function navigateBackToIncidents() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({subject: subject, recipients: [incident.email], body: message})
  }

  function sendWhatsapp() {
    //const number = '+5514997178121';
    const number = incident.whatsapp;
    Linking.openURL(`whatsapp://send?phone=${number}&text=${message}`)
  }

  return (

    <View style={styles.container}>

      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity style={styles.detailsButton} onPress={navigateBackToIncidents} >
          <Feather name="arrow-left" size={32} color={'#e02041'} />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.incidentList}
        data={[1]}
        keyExtractor={incident => String(incident)}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <View>

            <View style={styles.incident}>
              <Text style={[styles.incidentProperty, { marginTop: 0 }]}>CASO:</Text>
              <Text style={styles.incidentValue}>{incident.title}</Text>

              <Text style={styles.incidentProperty}>ONG:</Text>
              <Text style={styles.incidentValue}>{incident.name} de {incident.cidade} / {incident.uf}</Text>

              <Text style={styles.incidentProperty}>DESCRIÇÃO</Text>
              <Text style={styles.incidentValue}>{incident.description}</Text>

              <Text style={styles.incidentProperty}>VALOR:</Text>
              <Text style={styles.incidentValue}>{ 
                Intl
                .NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'})
                .format(incident.value)}</Text>
            </View>

            <View style={styles.contactBOX}>
              <Text style={styles.heroesTitle}>Salve o dia!</Text>
              <Text style={styles.heroesTitle}>Seja o herói desse caso.</Text>
              <Text style={styles.heroCallMe}>Entre em contato:</Text>

              <View style={styles.actions}>
                <TouchableOpacity style={styles.action}
                  onPress={sendWhatsapp}>
                  <Text style={styles.actionText}>WhatsApp</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.action}
                  onPress={sendMail}>
                  <Text style={styles.actionText}>E-Mail</Text>
                </TouchableOpacity>
              </View>
            
            </View>
          
          </View>

        )} />

    </View>
  );
}