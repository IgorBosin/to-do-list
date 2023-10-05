import { Dispatch } from "redux";
import { appActions } from "app/app.reducer"; // Импортируйте действия и типы, специфичные для вашего приложения
import { BaseResponseType } from "common/types/common.types";

/** (jsdoc комментарий)
 * Обрабатывает ошибки приложения, полученные с сервера, и обновляет состояние приложения.
 *
 * @template D - Тип данных ответа с сервера.
 * @param {BaseResponseType<D>} data - Данные ответа с сервера, содержащие сообщения об ошибке.
 * @param {Dispatch} dispatch - Функция для отправки действий Redux.
 * @param {boolean} [showError=true] - Флаг, указывающий, следует ли отображать сообщение об ошибке.
 */

export const handleServerAppError = <D>(data: BaseResponseType<D>, dispatch: Dispatch, showError: boolean = true) => {
  const errorMessage = data.messages.length > 0 ? data.messages[0] : "Some error occurred";

  if (showError) {
    dispatch(appActions.setAppError({ error: errorMessage }));
  }

  dispatch(appActions.setAppStatus({ status: "failed" }));
};
