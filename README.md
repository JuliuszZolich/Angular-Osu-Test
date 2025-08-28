> Aby uruchomić: `ng serve --proxy-config proxy.conf.json`

## Projekt opiera się o api do gry [Osu!](https://osu.ppy.sh/docs/index.html)
### Pobiera z api najnowsze wyniki (max 1000), filtruje, pobiera do nich dodatkowe dane i wyświetla w postaci listy.

`/scores`: <br>
Wyświetlany jest główny komponent `osu-notification-list.component` który zawiera:
-   Pojedyncze okno podglądu (`osu-map-component`)
-   Listę wyników (`osu-score-component`)
Do każdego `osu-score-component` jest przekazywany jeden z wyników, natomiast do `osu-map-component` jest przekazywana tylko beatmapa


