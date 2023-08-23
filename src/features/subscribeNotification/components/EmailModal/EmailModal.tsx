import React, { FC, FormEvent, useState } from 'react';
import { ModalWrapper } from '@components/ModalWrapper/ModalWrapper';

import './EmailModal.css';

import { Button } from '@components/Button/Button';
import cross from '@images/cross.svg';

interface Props {
  onClose: VoidFunction;
}

export const EmailModal: FC<Props> = ({ onClose }) => {
  const [sending, setSending] = useState(false);
  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    fetch('https://frontend.karpovcourses.net/api/v2/subscribe')
      .then(() => {
        _onClose();
      })
      .finally(() => setSending(false));
  };

  const _onClose = () => {
    if (!sending) onClose();
  };

  return (
    <ModalWrapper onClose={_onClose}>
      <div className="email-modal">
        <h2 className="email-modal__title">
          Хотите получать последние новости от{' '}
          <a href="#" className="email-modal__link">
            Karpov.Courses
          </a>
          ?
        </h2>
        <p className="email-modal__text">Оставьте свой e-mail и будем на связи! </p>
        <form className="email-modal__form" onSubmit={submitForm}>
          <input
            type="email"
            required
            className="email-modal__input"
            placeholder="Введите вашу почту"
          />
          <Button loading={sending}>Подписаться</Button>
        </form>
        <button className="email-modal__close" onClick={_onClose}>
          <img src={cross} alt="Закрытие модального окна" />
        </button>
      </div>
    </ModalWrapper>
  );
};
