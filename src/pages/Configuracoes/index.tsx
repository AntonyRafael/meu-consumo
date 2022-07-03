import AppLayout from "../../layout/App/AppLayout";
import styles from "./styles.module.scss";
import IconSettings from "../../assets/img/icon-settings.png";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { MdNightlightRound } from "react-icons/md";
import { IoSunny } from "react-icons/io5";
import { ConsumptionCategoryEnum, flowRateDefaultValues } from "../../utils/enums/ConsumptionCategoryEnum";
import Swal from "sweetalert2";



export default function Configuracoes() {
  const isDark = localStorage.getItem('isDark') || '';
  const [isDarkMode, setIsDarkMode] = useState(isDark.includes('true'));

  const [lavarLouca, setLavarLouca] = useState(0);
  const [tomarBanho, setTomarBanho] = useState(0);
  const [lavarRoupa, setLavarRoupa] = useState(0);
  const [escovarDente, setEscovarDente] = useState(0);

  useEffect(() => {
    const lavarLoucaStorage = localStorage.getItem(ConsumptionCategoryEnum.LAVAR_LOUCA);
    const chuveiroStorage = localStorage.getItem(ConsumptionCategoryEnum.TOMAR_BANHO);
    const lavarRoupaStorage = localStorage.getItem(ConsumptionCategoryEnum.LAVAR_ROUPA);
    const escovarDenteStorage = localStorage.getItem(ConsumptionCategoryEnum.ESCOVAR_DENTE);

    lavarLoucaStorage ? setLavarLouca(parseInt(lavarLoucaStorage)) : setLavarLouca(flowRateDefaultValues.LAVAR_LOUCA);
    chuveiroStorage ? setTomarBanho(parseInt(chuveiroStorage)) : setTomarBanho(flowRateDefaultValues.TOMAR_BANHO);
    lavarRoupaStorage ? setLavarRoupa(parseInt(lavarRoupaStorage)) : setLavarRoupa(flowRateDefaultValues.LAVAR_ROUPA);
    escovarDenteStorage ? setEscovarDente(parseInt(escovarDenteStorage)) : setEscovarDente(flowRateDefaultValues.ESCOVAR_DENTE);

  }, []);

  const saveFlowRate = () => {
    localStorage.setItem(ConsumptionCategoryEnum.LAVAR_LOUCA, lavarLouca.toString());
    localStorage.setItem(ConsumptionCategoryEnum.TOMAR_BANHO, tomarBanho.toString());
    localStorage.setItem(ConsumptionCategoryEnum.LAVAR_ROUPA, lavarRoupa.toString());
    localStorage.setItem(ConsumptionCategoryEnum.ESCOVAR_DENTE, escovarDente.toString());

    Swal.fire('Dados alterados com sucesso!', '', 'success');
  };

  const toggleDarkMode = () => {
    const isDark = localStorage.getItem('isDark') || '';
    localStorage.setItem("isDark", JSON.stringify(!isDark.includes('true')));
    setIsDarkMode(!isDark.includes('true'))
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <AppLayout
      primaryColorBackground="#17a1af"
      secondaryColorBackground="#1eb6c6"
      menuColor={"#145E7Bda"}
      imageLayout={IconSettings}
      imageDescription="Ícone de uma engrenagem no centro da tela."
      pageTitle="Configurações"
    >
      <div className={styles.main}>
        <h2>Alterar vazão (l/min)</h2>

        <div className={styles.inputWrapper}>
          <p>Lavar Louça</p>
          <input
            type="text"
            placeholder="Vazão"
            className={styles.inputField}
            value={lavarLouca}
            onChange={(e) => setLavarLouca(+e.target.value|| 0)}
          />
        </div>

        <div className={styles.inputWrapper}>
          <p>Chuveiro</p>
          <input
            type="text"
            placeholder="Vazão"
            className={styles.inputField}
            value={tomarBanho}
            onChange={(e) => setTomarBanho(+e.target.value || 0)}
          />
        </div>

        <div className={styles.inputWrapper}>
          <p>Lavar Roupa</p>
          <input
            type="text"
            placeholder="Vazão"
            className={styles.inputField}
            value={lavarRoupa}
            onChange={(e) => setLavarRoupa(+e.target.value || 0)}
          />
        </div>

        <div className={styles.inputWrapper}>
          <p>Escovar Dente</p>
          <input
            type="text"
            placeholder="Vazão"
            className={styles.inputField}
            value={escovarDente}
            onChange={(e) => setEscovarDente(+e.target.value || 0)}
          />
        </div>
        <div className={styles.actions}>
          <Button
            backgroundColor="#1eb6c6"
            tabIndex={0}
            onClick={saveFlowRate}
            rounded
            fullWidth
          >
            Salvar
          </Button>
        </div>
      </div>

      <div className={styles.themeWrapper}>
        <div
          className={`${styles.theme}  ${
            isDarkMode ? styles.light : styles.dark
          }`}
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <IoSunny /> : <MdNightlightRound />}
          {isDarkMode ? <p>Ativar modo claro</p> : <p>Ativar modo escuro</p>}
        </div>
      </div>
    </AppLayout>
  );
}
