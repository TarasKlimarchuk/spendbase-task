Nice to have:

Написано тест кейс по пошуку за назвою
(шлях тест файлу: src/components/Main/Main.test.tsx)

Реалізовано права доступу: видалення, перетягування - для кожної папки, файла
Правила на папки, файли змінюються в json-файлі прикладу даних
(шлях json-файлу: public/assets/treeData.json)

Додана можливість перетягування, видалення папок, файлів

Вразливе місце з точки зору продуктивності - це синхронний пошук. Додано debounce