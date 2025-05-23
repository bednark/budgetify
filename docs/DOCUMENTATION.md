### Wstęp

`budgetify` to prosta aplikacja webowa stworzona z myślą o wygodnym zarządzaniu budżetem domowym. Głównym celem aplikacji jest ułatwienie monitorowania wydatków i dochodów oraz ich wizualizacja.
Aplikacja umożliwia użytkownikowi dodawanie transakcji finansowych – zarówno przychodów, jak i wydatków – z możliwością przypisywania ich do konkretnych kategorii. Dzięki temu użytkownik może w prosty sposób analizować, na co przeznaczane są środki i jakie są główne źródła dochodu. Przejrzysty interfejs oraz graficzna prezentacja danych, w postaci salda i listy transakcji, pozwalają na szybkie zorientowanie się w aktualnym stanie finansów.

### Opis funkcjonalności

Użytkownik ma do dyspozycji 3 widoki:
- **Dashboard** - główny panel, któy prezentuje wizualizacje finansów w formie wykresów. Użytkownik ma możliwość wyboru zakres dat, dla którego będą prezentowane dane.
- **Wydatki** - sekcja umożliwiające dodawanie i przeglądanie wydatków.
- **Przychody** - strona, na której użytkownik może dodawać oraz przeglądać swoje przychody. Dodatkowo użytkownik może filtrować przychody według przedziału dat.

### Opis techniczny

Użyte technologie:
- **Next.js** - framework oparty na bibliotece React, umożliwiający tworzenie aplikacji internetorwy po stronie serwera oraz statycznego generowania stron.
- **MongoDB** - nierelacyjna baza danych wykorzystywana w aplikacji do trwałego przechowywania danych. Aby umożliwić współdzielenie danych pomiędzy użytkownikami dane muszą być przechowywana w zewnętrznej bazie danych.
- **Chart.js** - biblioteka do tworzenia interaktywnych wykresów. W projekcie została wykorzystana do wizualizacji przychodów oraz wydatków.
- **NextAuth.js** - biblioteka do zarządzania autoryzacją i uwierzytelniania.
- **web-push** - do uzupełnieina
- **Git** - system kontroli wersji, który umożliwia śledzenie zmian w kodzie źródłowym.

### Autoryzacja i zarządzenie sesją

Aplikacja została zaprojektowana z myślą o współdzieleniu jej pomiędzy wielu użytkowników, dlatego wszystkie dane dotyczące przychodów i wydatków są przechowywane w zewnętrznej bazie danych. Ponieważ budgetify funkcjonuje w kontekście konkretnego budżetu, dostęp do każdej instancji aplikacji musi być odpowiednio zabezpieczony. W tym celu wdrożono mechanizm uwierzytelniania oparty na bibliotece NextAuth.js, wykorzystujący protokół OAuth oraz integrację z zewnętrznym dostawcą tożsamości – platformą GitHub.

Konta, którym bedzie zezwolone logowanie określa się za pomocą zmiennej środowiskowej `ALLOWED_USERS`, w której podajemy po przecinku nazwy użytkowników kont GitHub.

**Konfiguracja aplikacji OAuth w GitHub**
Aby umożliwić logowanie przez GitHub, należy utworzyć aplikację OAuth w ustawieniach konta:

1. Zaloguj się na GitHub i przejdź do ustawień: https://github.com/settings/developers
2. Kliknij "**New OAuth App**".
3. Wypełnij formularz:
  - Application name – np. Budgetify
  - Homepage URL – np. http://localhost:3000
  - Authorization callback URL – np. http://localhost:3000/api/auth/callback/github
4. Zatwierdź formularz – po utworzeniu aplikacji otrzymasz `Client ID` oraz `Client Secret`, które należy wpisać do zmiennych środowiskowych `GITHUB_CLIENT_ID` oraz `GITHUB_CLIENT_SECRET`

![Github 1](https://raw.githubusercontent.com/bednark/budgetify/master/docs/screenshots/github-1.png)

![Github 2](https://raw.githubusercontent.com/bednark/budgetify/master/docs/screenshots/github-2.png)

![Logowanie 1](https://raw.githubusercontent.com/bednark/budgetify/master/docs/screenshots/logowanie-1.png)

![Logowanie 2](https://raw.githubusercontent.com/bednark/budgetify/master/docs/screenshots/logowanie-2.png)

![Logowanie 3](https://raw.githubusercontent.com/bednark/budgetify/master/docs/screenshots/logowanie-3.png)

![Logowanie 4](https://raw.githubusercontent.com/bednark/budgetify/master/docs/screenshots/logowanie-4.png)

### Obsługa offline i PWA

Aby zwiększyć dostęp i wygodę do aplikacji, została ona dostosowana do działania jako **Progresive Web App**. Dzięki temu użytkownik uzyskuje możliwość korzystania z aplikacji w trybie offline oraz instalacji jej na swoim urządzeniu mobilnym.
Główne cele implementacji PWA:
- **Cache po stronie klienta** - aplikacja korzysta z [Service Worker'a](https://github.com/bednark/budgetify/blob/master/public/sw.js), czyli specjalnego skryptu, który działa w tle przeglądarki oraz przechwutuje żądania sieciowe i umożliwia buforowanie zasobów takich jak plik CSS, HTML oraz JavaScript. Dzięki temu aplikacja jest bardziej wydajna.
- **Dostęp offline** - dzięki skonfigurowanej strategii cache cache aplikacja umożliwia przeglądać dane gdy urządzenie jest poza siecią. Na ten moment dane są tylko do odczytu.
- **Instalacja na urządzeniu mobilnym oraz pulpicie** - aplikacja zawiera plik [manifest](https://github.com/bednark/budgetify/blob/master/src/app/manifest.ts), czyli plik konfiguracyjny PWA, który zawiera podstawowe informacje o aplikacji (takie jak nazwa, ikony, kolor tła oraz tryb uruchomienia). Dzięki niemu jest możliwa instalacja aplikacji na pulpicie urządzenia co ułatwia dostęp do aplikacji.

![PWA 1](https://raw.githubusercontent.com/bednark/budgetify/master/docs/screenshots/pwa-1.png)

![PWA 2](https://raw.githubusercontent.com/bednark/budgetify/master/docs/screenshots/pwa-2.png)

![PWA 3](https://raw.githubusercontent.com/bednark/budgetify/master/docs/screenshots/pwa-3.png)

### Powiadomienia

Jednym z dodatkowych możliwości aplikacji w wersji PWA jest obsługa powiadomień systemowych. Dzięki temu użytkownik ma możliwość otrzymywania komunikatów na ekranie urządzenia nawet gdy aplikacja działa w tle.
W `budgetify` został zaimplementowany specjalny endpoint, który odpowiada za zebranie wszystkich wydatków z datą jutrzejszą oraz wyświetlenie powiadomienia przypominającym o nadchodzących wydatkach. Endpoint jest dostępny pod ścieżką `/api/send-push` oraz został zabezpieczony kluczem autoryzacji, który należy wygenerować i podać przy konfiguracji zmiennych środowiskowych. Zmienna odpowiadająca za klucz to `API_KEY`. Aby przeprowadzić autoryzację żądania HTTP należy dodać nagłówek `x-api-key` z wartością klucza.
Do implementacji obsługi powiadomień została wykorzystana biblioteka `web-push`. Komunikacja pomiędzy backendem, a przeglądarką jest realizowana za pomocą protokołu VAPID, który umożliwia identyfikację serwera z którego wysyłane są powiadomienia. Polega to na dołączeniu podpisu cyfrowego do wiadomości push, co pozwala przeglądarce zweryfikować, że powiadomienie pochodzi z zaufanego źródłą.
Aby aplikacja mogła poprawnie wysyłać powiadomienia należy wygenerować parę kluczy VAPID do tego trzeba wykonać następujące kroki:

Instalacja web-push
```bash
pnpm add -g web-push
```

Generowanie kluczy VAPID
```bash
web-push generate-vapid-keys
```

Oczekiwany rezultat
```
===================================
Public Key:
BEXAMPLEKEYsdfsdljfljsdlfjsldfj

Private Key:
LKJLKJfjsdlfjsdlfjlsjdfljlsdf

===================================
```

Wygenerowane klucze należy dodać do zmiennych środkowiskowych `NEXT_PUBLIC_VAPID_PUBLIC_KEY` oraz `VAPID_PRIVATE_KEY`.

![Powiadomienie 1](https://raw.githubusercontent.com/bednark/budgetify/master/docs/screenshots/powiadomienie-1.png)

![Powiadomienie 2](https://raw.githubusercontent.com/bednark/budgetify/master/docs/screenshots/powiadomienie-2.png)

![Powiadomienie 3](https://raw.githubusercontent.com/bednark/budgetify/master/docs/screenshots/powiadomienie-3.png)

### MongoDB i model danych

Do trwałego przechowywania danych w aplikacji użyto bazę NoSQL MongoDB, która przechowuje dane w formacie dokumentów JSON. Do hostowania bazy danych wykorzystano MongoDB Atlas, czyli chmurową platformę zarządzaną przez twórców MongoDB.
W aplikacji struktura danych wygląda następująco:
- `categories` - kolekcja, w której przechowywane są kategorie, które użytkownik może wybrać przy dodawaniu nowego wydatku.

```
{
  _id: ObjectId,
  name: string
}
```
- expenses - kolekcja, w której przechowywane są wydatki.

```
{
  _id: ObjectId,
  name: string,
  price: number,
  category: string,
  date: Date,
  notified: boolean
}
```
- incomes - kolekcja przechowująca przychody.

```
{
  _id: ObjectId,
  name: string,
  price: number,
  date: Date
}
```

- push_subscriptions - kolekcja przechowująca subkskrybentów, do których będą docierały powiadomienia.

```
{
  _id: ObjectId,
  endpoint: string,
  keys: {
    p256dh: string,
    auth: string
  }
}
```

Aby uruchomić własną instancję bazy danych w MongoDB Atlas, należy wykonać następujące kroki:

1. Rejestracja
  - Przejdź na stronę: https://www.mongodb.com/cloud/atlas
  - Załóż darmowe konto (możesz skorzystać z logowania przez Google lub GitHub)

2. Utworzenie klastra
  - Po zalogowaniu utwórz nowy projekt, a następnie kliknij „Build a Database”
  - Wybierz darmowy klaster typu M0 Free Tier, wybierz region i nazwij klaster

3. Dodanie użytkownika bazy
  - Przejdź do zakładki Database Access i utwórz użytkownika z nazwą i hasłem
  - Można przyznać mu rolę readWrite dla konkretnej bazy

4. Zezwolenie na połączenie
  - W zakładce Network Access dodaj do whitelisty adres IP, z którego będzie wykonywane połączenie. W przypadku hostingu w Vercel w jego darmowej wersji aplikacja nie będzie miała stałego adresu ip więc należy dopuścić wszystkie adresy do bazy wpisując `0.0.0.0/0`

5. Uzyskanie connection string
  - Wejdź w zakładkę Database → Connect i wybierz „Connect your application”
  - Skopiuj wygenerowany URI

Uzyskany connection string należy uzupełnić w zmiennej środowiskowej pod nazwą `MONGODB_CONNECTION_STRING`.

### Wdrożenie środowiska deweloperskiego

Pobieramy repozytorium

```bash
git clone https://github.com/bednark/budgetify
```

Przechodzimy do repozytorium oraz instalujemy zależności

```bash
cd budgetify/
pnpm i
```

Tworzymy plik .env i uzupełniamy zmienne środowiskowe

```bash
cat << EOF >> .env
MONGODB_CONNECTION_STRING=     # Adres (URI) połączenia do bazy MongoDB
GITHUB_CLIENT_ID=              # Identyfikator klienta OAuth
GITHUB_CLIENT_SECRET=          # Sekret klienta OAuth z GitHub
NEXTAUTH_SECRET=               # Sekret używany przez NextAuth
NEXTAUTH_URL=                  # Publiczny adres URL aplikacji
ALLOWED_USERS=                 # Lista loginów GitHub
NEXT_PUBLIC_VAPID_PUBLIC_KEY=  # Publiczny klucz VAPID
VAPID_PRIVATE_KEY=             # Prywatny klucz VAPID
API_KEY=                       # Klucz autoryzacyjny do /api/send-push
EOF
```

Uruchomienie aplikacji

```bash
pnpm dev
```

### Wdrożenie środowiska produkcyjnego

Aplikacja budgetify została wdrożona w środowisku produkcyjnym za pomocą platformy Vercel, która zapewnia automatyczne budowanie i hosting aplikacji Next.js. Vercel umożliwia integrację z GitHub, dzięki czemu każda zmiana w repozytorium może automatycznie wywołać proces deployowania.

Kroki wdrożenia:

1. Rejestracja w platformie Vercel
  - Przejdź na https://vercel.com i załóż konto
2. Import projektu z GitHub
  - W panelu Vercel kliknij "**Add New Project**", a następnie wybierz repozytorium z aplikacją budgetify.
3. Konfiguracja zmiennych środowiskowych
  - W zakładce Settings - Environment Variables dodaj wszystkie wymagane zmienne środowiskowe
4. Deploy
  - Po zapisaniu konfiguracji Vercel automatycznie uruchomi pierwszy deploy.
  - Kolejne zmiany wprowadzone w repozytorium w gałęzi `master` będą automatycznie publikowane.

![Vercel 1](https://raw.githubusercontent.com/bednark/budgetify/master/docs/screenshots/vercel-1.png)

![Vercel 2](https://raw.githubusercontent.com/bednark/budgetify/master/docs/screenshots/vercel-2.png)

![Vercel 3](https://raw.githubusercontent.com/bednark/budgetify/master/docs/screenshots/vercel-3.png)

![Vercel 4](https://raw.githubusercontent.com/bednark/budgetify/master/docs/screenshots/vercel-4.png)

### Podsumowanie

Aplikacja `budgetify` to nowoczesne narzędzie do zarządzania budżetem domowym, zaprojektowane z myślą o wygodzie, dostępności i prywatności użytkownika. Dzięki wykorzystaniu technologii takich jak Next.js, MongoDB Atlas, NextAuth.js i Vercel, udało się stworzyć lekką, ale funkcjonalną aplikację umożliwiającą śledzenie przychodów i wydatków, ich wizualizację oraz dostęp offline dzięki technologii PWA.

Projekt stanowi solidną podstawę do dalszego rozwoju. Wśród potencjalnych kierunków rozwoju aplikacji można wyróżnić:

- Współdzielone budżety – możliwość zapraszania innych użytkowników do wspólnego zarządzania tym samym budżetem.

- Limity kategorii – definiowanie maksymalnych miesięcznych wydatków w wybranych kategoriach z opcją powiadomień o ich przekroczeniu.

- Transakcje cykliczne – automatyczne dodawanie powtarzających się wydatków i przychodów (np. czynsz, pensja).

- Import/eksport danych – umożliwienie eksportu danych do formatu CSV lub PDF oraz importu danych z innych źródeł.

- Zaawansowane powiadomienia – przypomnienia o nadchodzących wydatkach, cyklicznych transakcjach czy przekroczeniu budżetu.

- Dedykowana wersja mobilna / aplikacja natywna – przekształcenie PWA w pełnoprawną aplikację natywną przy użyciu np. Capacitor lub React Native.

`budgetify` to aplikacja, która w obecnej formie dostarcza solidny zestaw funkcjonalności, a dzięki przemyślanej architekturze – pozostaje otwarta na dalszą rozbudowę w zależności od potrzeb użytkowników i kierunku rozwoju projektu.

### Załączniki

**Adres repozytorium**: https://github.com/bednark/budgetify

**Adres aplikacji**: https://budgetify-eosin.vercel.app

**Screeny z aplikacji**:

![Aplikacja 1](https://raw.githubusercontent.com/bednark/budgetify/master/docs/screenshots/aplikacja-1.png)

![Aplikacja 2](https://raw.githubusercontent.com/bednark/budgetify/master/docs/screenshots/aplikacja-2.png)

![Aplikacja 3](https://raw.githubusercontent.com/bednark/budgetify/master/docs/screenshots/aplikacja-3.png)
