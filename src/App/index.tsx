import { Docs, get } from 'api';
import React, { FC, useState } from 'react';

export const App: FC = () => {

  const [items, setItems] = useState<Docs['exampleEndpoint']['entity'][] | null>(null);

  const click = () => {
    if (items?.length) {
      setItems(null);
      return;
    }
    get({
      endpoint: 'exampleEndpoint',
      params: { count: 0 }
    }).then(({ data }) => setItems(data));
  }

  return (
    <>
      <div
        style={{
          margin: 30,
          cursor: 'pointer',
          color: 'blue'
        }}
        onClick={click}
        title="click it"
      >
        ExampleeEndpoint
      </div>
      <pre
        style={{
          margin: 30
        }}
      >
        {JSON.stringify(items || undefined, null, 2)}
      </pre>
      <pre
        style={{
          float: 'right',
          marginRight: 200
        }}
      >
        {`
          В этом приложении я решил показать одно из решений по работе с моком и апи.

          Есть папка serverMock.
          Находясь в корне проекта, либо перейдя в терменале в саму папку serverMock
          мы можем ввести скрипт npm run mock.
          На порту 8080 стартанет rest api сервер.
          Чтобы добавить новый эндпойнт нужно из папки serverMock ввести в терминале
          npm run gen <название нового эндпойнта>.
          После этого сгенирируется папка с контроллером (и готовым шаблонным кодом в ней)
          и папка с именем эндпойнта в папке store. Содержимое будет уже экспортироваться из главного
          объекта store и подключено к контроллеру.
          Также можно создавать эндпойнты и руками,
          в коде есть комментарии с пошаговой инструкцией как это сделать.
          
          Сервер расчитан на использование даже джуниорами фронтами.
          Его плюсы это простота, быстрая скорость создания эндпойнтов,
          и то, что он не требует ни единой зависимости и полностью автономен
          но и доработать нужно много)

          Еще одна фича это папка api.
          Это слой доступа к данным.
          Главное, что он делает это экспортирует во внешний мир 4 функции:

            get, post, put, delete

          Фича в том, что все эти функции абсолютно типизированны.

          пример использования:

          get({
            endpoint: 'exampleEndpoint',
            params: { count: 1 }
          })

          суть в том, что метод GET мы можем вызвать только для тех эндпойнтов,
          которые поддерживают этот метод.
          Выбрав эндпойнт, если у него обязательны параметры мы тоже не можем не передать их
          или передать не те.
          Если в апи нет эндпойнтов с методом PUT, то и функцию put мы вызвать не сможем.

          Достигается этого благодаря тому, что мы документируем апи в файле docs.ts
          Структура документации максимально простая, намного лаконичней чем та, что описывается,
          например в ямлах для openApi.

          Таким образом мы получаем хорошо документированный и типизированный слой доступа к данным
          на фронте, подходящий для использования в любом проекте.
          но и тут конечно тоже есть что улучшить)

        `}
      </pre>
    </>
  );
};