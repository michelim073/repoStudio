import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ModalScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>© [Año de Creación] [Nombre de la Empresa o Desarrollador]

Todos los derechos reservados. Esta aplicación móvil y todo su contenido, incluyendo pero no limitado a textos, gráficos, logotipos, imágenes, videos, audios, y cualquier otro material, están protegidos por las leyes de derechos de autor y otras leyes de propiedad intelectual.

La aplicación, sus características y su contenido son propiedad exclusiva de [Nombre de la Empresa o Desarrollador]. Queda estrictamente prohibida la reproducción, distribución, modificación, exhibición pública o cualquier otro uso no autorizado de la aplicación o de cualquier parte de su contenido, ya sea de forma parcial o completa, sin el consentimiento previo por escrito de [Nombre de la Empresa o Desarrollador].

Esta aplicación puede contener material protegido por derechos de autor de terceros, utilizado con el debido permiso o de conformidad con la ley aplicable. Cualquier uso no autorizado de dicho material puede constituir una violación de los derechos de propiedad intelectual de los respectivos propietarios.

Queda expresamente prohibida la copia, reproducción o distribución no autorizada de los materiales educativos, textos sagrados, enseñanzas y cualquier otro contenido relacionado con los cursos religiosos ofrecidos a través de esta aplicación.

El nombre y el logotipo de la aplicación son marcas comerciales registradas de [Nombre de la Empresa o Desarrollador]. El uso no autorizado de estas marcas comerciales está estrictamente prohibido.

Cualquier violación de estos derechos de autor y términos de uso puede dar lugar a acciones legales y compensaciones por daños y perjuicios.

Gracias por respetar los derechos de autor y contribuir a la integridad y el valor de esta aplicación para cursos religiosos.

[Año de Creación] [Nombre de la Empresa o Desarrollador]</Text>
     
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
