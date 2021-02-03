import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Contianer, DateButton, DateText, Picker } from './styles';

export default function DateInput({ date, onChange }) {
  const [opened, setOpened] = useState(false);

  const dateFormatted = useMemo(
    () =>
      format(date, "dd 'de' MMMM 'de' yyyy", {
        locale: pt,
      }),
    [date]
  );

  function handleChangeDate(event, selectedDate) {
    if (selectedDate) {
      onChange(selectedDate);
    }

    setOpened(false);
  }

  return (
    <Contianer>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" color="#fff" sixe={20} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>

      {opened && (
        <Picker>
          <DateTimePicker
            value={date}
            testID="dateTimePicker"
            onChange={handleChangeDate}
            minimumDate={new Date()}
            minuteInterval={60}
            locale="pt"
            mode="date"
            display="spinner"
          />
        </Picker>
      )}
    </Contianer>
  );
}

DateInput.propTypes = {
  date: PropTypes.objectOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};
