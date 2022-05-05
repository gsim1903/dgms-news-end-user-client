import React from "react";
import { Dropdown } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

const languageOptions = [
  { key: "english", text: "English", value: "en" },
  { key: "swedish", text: "Swedish", value: "sv" },
];

const LanguageChoice = () => {
  const { i18n } = useTranslation();

  const handleChange = (data) => {
    i18n.changeLanguage(data.value);
  };

  return (
    <Dropdown
      data-cy="dropdown"
      button
      className="icon"
      floating
      labeled
      icon="world"
      options={languageOptions}
      search
      text="Select Language"
      onChange={(events, data) => handleChange(data)}
    />
  );
};

export default LanguageChoice