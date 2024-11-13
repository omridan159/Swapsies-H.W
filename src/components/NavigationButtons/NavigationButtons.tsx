import React from 'react';
import styles from './NavigationButtons.module.css';
import classNames from 'classnames';

interface Props {
  onNext: () => void;
  onBack?: () => void;
  showBack?: boolean;
  nextButtonText?: string;
}

const NavigationButtons: React.FC<Props> = ({
  onNext,
  onBack,
  showBack = true,
  nextButtonText = 'Next',
}) => {
  return (
    <div
      className={classNames(styles.buttonsContainer, {
        [styles.spaceBetween]: showBack,
        [styles.flexEnd]: !showBack,
      })}
    >
      {showBack && onBack && (
        <button
          className={classNames(styles.button, styles.secondary)}
          onClick={onBack}
        >
          Back
        </button>
      )}
      <button
        className={classNames(styles.button, styles.primary)}
        onClick={onNext}
      >
        {nextButtonText}
      </button>
    </div>
  );
};

export default NavigationButtons;
