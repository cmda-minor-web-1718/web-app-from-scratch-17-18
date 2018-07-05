# wafs
The course repo for 'Web App From Scratch'

##

During this course I made a webapp that lets you fetch videos from youtube and add them to the webapp overview. I have used routie for navigating through the various sections and detail view. Navigation is triggered on hashchange.

Rendering of the video's was done through Transparency.js. This is a minimal templating script that pairs objects to html elements, and automatically renders multiple elements. 

[click here to open the webapp](https://nielsfs.github.io/wafs/app)

## visual flow

![](https://lh3.googleusercontent.com/V8k6Wrvk80-nr98kFznEAQpGUglvKbqqMGfLiji1hj7eYEwla7ZsIo2K59Hm4vcviWG3WCtaSvyXnILlkJWnrHGne-o8htHif42v_u6vHl5ue_zHgiIF73ZNgRz-g4s-B-KoHfJwIVTd3gQSvBEUi_A7GR6tL7KB7k8qI19rnbsfw6cnTErxNnxRY9G-l6qNiy9ioxKKIxUGv_uSgtxc7gKVtR5DOLGAd02a8uXI7p0UOWpXo29Md8updoTEnPK5fK5pFXGA38j-RsKrJb4_zpcMLSwJ_etmyLExsBdgJ_ps2bEcn2gR97bobUHUdlZyET-c-6NliKYNnxet38COwID3GaDrwuKDyEyqjN3AItOnfNnHRpJUzbCHJYS70Rk8rQWzwilBjFiRfEzFTY1hKQkn3j9MYHSzjS6nbdQyrHX8A2hn66_ECOXi6_FyeaT13dfC-HAHfryAYxYTTk4SkaIrVqU6PhHirZ_xlirTX_N18lkjGjAw7_DIkkcEFn7YiuGtZJ7HIE2nVMRZ2dNEswVvYhAx7LCtjBeasGRUU3QSLqF3ByKwP-XOh2xmDSt5QM4rixCdJV4unr1CQJnHjGyldf5PuovY3aDv_AY=w2302-h1600-no)

## interaction diagram

![](https://lh3.googleusercontent.com/g_SBlWuoUvSTGiMU4g2MmWCIdX5cRUJMbK5FyJK0_WoIIVZzOX2MQxTu8JC1z9J_OfYGm4j0woYQhjUFyJ4BnEX_kdPvZPvgPxL-ydlAJ8TE2URDVBcM9DQGrE6Ffu5Kw3kA42SwLK9ydS3hICp6Mm9xu3iAmVy_M6TWmY6l-D7jgXBJsMDR50FtdBPL0uRyv1taofcQ29eSsHAVljNUEjmHsFJ-TvqZaNEZT5Jp8_QPNLVpQ_K6EMC4vZbGMiFBU6UUUP9HzEaaIAGNJE2zEctOtw71JO75XBezzzoQ_mBsp5U-JKnknRpwOpfmbIA4LQO3t5vbVWNsighqI45jTXU0swHOE-Vf7jQ3Uz2SKkj_sZEtHB3qE5RB3FkBCZemNJRHZiG7l41O0z_OqexmaNcjIt1bPQTbPyNdH-foAJwOp0rLwaZU9ftyrN2x28u_j4dPswLFi7ypBZ1y04u_V2rinQwsi6BDIWY4gzAW7JBLUN93NxzUkl78e-ftQ93jV2CtDTrjGIPbBO81XUPxcQ93dO_-KjzOtjUQgYpCQnSS5H7Ihf-L-3P36TAoFMi6-5jX8g5TowcA4i1D61nwEf2Lbl27pz5_tSmMhhE=w2504-h1606-no)

## Advantages and disadvantages of JavaScript libraries/frameworks
...

bron: (1 t/m 3)

Voordelen:

- het kan processen vergemakkelijken
- Vaak zijn libraries en frameworks gratis
- Ze kunnen meer structuur geven aan je applicatie
- 

nadelen:

- Door veel met libraries en frameworks te werken, werk je buiten de basis taal om. Hierdoor raak je minder ervaren en bedreven met deze basis

- Het is minder future proof. Er komen regelmatig nieuwe libraries en frameworks bij en ze verdwijnen ook (doordat ze autdated raken). Door meer bezig te zijn met de basis van Javascript wordt het lastiger wanneer je moet switchen van library / framework. 

- Tegenwoordig kan alles ook gemakkelijk gedaan worden met vanilla Javascript. Vroeger toen browsers nog minder compatible waren met bepaalde applicaties hielp bijvoorbeeld jquerry enorm met het gemakkelijk selecteren van elementen in de DOM. je kon zo makkelijk animaties enzo toevoegen. tegenwoordig zijn browsers heel goed geworden waardoor bijna alles wat je met jQuerry deed ook met vanilla Javascript gedaan kan worden

- Soms kan het gebruiken van Libraries iets in je website kapot maken

## Advantages and disadvantages of client-side single page web apps
...

bron: (4)

voordelen:

- Heeft een erg gebruiksvriendelijke user experience
- Pagina's worden veel sneller geladen
- Maakt websites overzichtelijker
- Zorgt er voor dat mensen langer op je website blijven door verbeterde laadtijd
- Ze worden steeds beter indexeerbaar door search engines

nadelen:

- Is over het algemeen slechter te indexeren door search engines
- stuk moeilijker om te designen en bouwen
- je zal vaak gebrui moeten maken van bepaalde "hacks" om de website helemaal functioneel te maken en goed te indexeren maken
- Door "memory leaks" kan het je computer/mobiel vertragen
- ze zijn over het algemeen minder veilig dan traditionele web pagibna's
- wanneer je navigeert door een single page web app, en vervolgens in je browser terug wil gaan naar de vorige pagina, dan kan het lastig zijn om de gebruiker op het zelfde punt op de pagina terug te brengen waar hij was gebleven. Browsers doen dit zelf heel goed, maar als je een SPA maakt dan moet je hier zelf rekening mee houden.

## Best practices
...

BRON: (5)

- ga altijd voor leesbaarheid ipv optimisatie. Wat je wint in optimisatie weegt niet op tegen de voordelen van goed leesbare code.

- begin altijd met de architectuur van je code. Door geen rekening te houden met hoe je iets in elkaar gaat zetten gaat gegarandeerd problemen opleveren in latere stadia van het project. Zorg er dus voor dat je van tevoren bedenkt hoe je je code gaat structureren, welke modules je gaat maken, hoe die modules met elkaar in verband staan en hoe je aan het eind van de rit gaat debuggen.

- KISS: hou je code simpel. Door complexe code te schrijven wil het niet zeggen dat je applicatie ook beter gaat werken. De meest simpele oplossingen zijn vaak het beste.

- schrijf inline documentatie om de leesbaarheid van je code te verbeteren

- probeer altijd met voldoende energie te coderen. Wanneer je moe bent maak je veel meer fouten wat je later weer veel tijd kan kosten. Zorg er dus voor dat je wanneer je moe bent uitrust zodat je efficient kan coderen.

- probeer je in je vrije tijd te focussen op het leren van nieuwe dingen. Wanneer je vast houd aan de dingen waar je vertrouwd mee bent dan zal je niet verder komen en met de tijd zal je degraderen. Het is alsof je tegen een harde wind aan loopt: Zwoeg en kom vooruit of sta stil en wordt terug geduwd.

- Zorg dat je flexibel bent in je methodology. Dat jij graag in een bepaalde taal werkt betekent niet dat die taal ook de beste methode is voor het maken van een applicatie. Zorg dus dat je flexibel bent en niet koppig je vastklampt aan één methode van iets bewerkstelligen.


BRONNEN:

1: https://1stwebdesigner.com/web-frameworks/
2: https://learntocodewith.me/posts/javascript-libraries-frameworks/
3: https://www.noupe.com/development/javascript-frameworks-94897.html
4: https://medium.com/@NeotericEU/single-page-application-vs-multiple-page-application-2591588efe58
5:https://hackernoon.com/few-simple-rules-for-good-coding-my-15-years-experience-96cb29d4acd9



