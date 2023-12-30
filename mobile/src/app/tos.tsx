import { ScrollView, StyleSheet, View } from "react-native";

import { theme } from "@/common/theme";
import { AppText } from "@/components/text";

export default function TermsOfServicePage() {
  return (
    <View style={styles.container}>
      <AppText
        weight="extra-bold"
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "white",
          marginBottom: theme.spacing(2),
        }}
      >
        Regulamin Korzystania z Aplikacji Mobilnej
      </AppText>
      <ScrollView>
        <AppText
          style={{
            color: theme.colors.textOnBackground,
          }}
        >
          {termsOfService}
        </AppText>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing(3),
    paddingVertical: theme.spacing(3),
  },
});

const termsOfService = `
1. Wstęp
1.1. Niniejszy regulamin określa zasady korzystania z aplikacji mobilnej QRestaurant.
1.2. Aplikacja mobilna QRestaurant przeznaczona jest do użytku osobistego i niekomercyjnego.

2. Rejestracja i dane osobowe
2.1. W celu korzystania z pełnej funkcjonalności aplikacji, użytkownik jest zobowiązany do utworzenia konta.
2.2. Podczas procesu rejestracji użytkownik jest zobowiązany podać prawdziwe dane osobowe: imię, nazwisko oraz adres e-mail.
2.3. Dane osobowe użytkowników są chronione i przetwarzane zgodnie z obowiązującymi przepisami o ochronie danych osobowych.

3. Ochrona danych osobowych
3.1. Administratorem danych osobowych jest QRestaurant.
3.2. Dane osobowe są przetwarzane w celu świadczenia usług przez aplikację oraz w celach marketingowych, o ile użytkownik wyrazi na to zgodę.
3.3. Użytkownik ma prawo dostępu do swoich danych oraz żądania zaprzestania ich przetwarzania.

4. Warunki użytkowania
4.1. Użytkownik zobowiązuje się do korzystania z aplikacji w sposób zgodny z prawem i dobrymi obyczajami.
4.2. Zabronione jest wykorzystywanie aplikacji do celów nielegalnych lub naruszających prawa innych osób.

5. Zmiany w regulaminie
5.1. QRestaurant zastrzega sobie prawo do zmiany niniejszego regulaminu w dowolnym czasie.
5.2. O wszelkich zmianach użytkownik będzie informowany poprzez aplikację lub e-mail.

6. Postanowienia końcowe
6.1. Akceptacja niniejszego regulaminu jest równoznaczna z wyrażeniem zgody na przetwarzanie danych osobowych w celach określonych w punkcie 3.
6.2. W sprawach nieuregulowanych niniejszym regulaminem zastosowanie mają przepisy prawa obowiązującego na terytorium Rzeczypospolitej Polskiej.
`;
