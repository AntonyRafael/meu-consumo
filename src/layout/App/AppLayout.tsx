import HamburguerMenu from "../../components/HamburguerMenu";
import styles from "./styles.module.scss";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type AppLayoutProps = {
  children: React.ReactNode;
  primaryColorBackground?: string;
  secondaryColorBackground?: string;
  pageTitle?: string;
  pageSubtitle?: string;
  imageLayout?: string;
  imageDescription?: string;
  menuColor?: string;
};

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  primaryColorBackground = "#F1F5FF",
  secondaryColorBackground,
  pageTitle = "Painel",
  pageSubtitle,
  imageLayout,
  imageDescription,
  menuColor,
}: AppLayoutProps) => {
  const navigate = useNavigate();

  const gradientStyle = {
    background: `linear-gradient(135deg, ${secondaryColorBackground} 25%, transparent 25%) -74px 0/ 148px 148px,
      linear-gradient(225deg, ${secondaryColorBackground}80 25%, transparent 25%) -74px 0 / 148px 148px,
      linear-gradient(315deg, ${secondaryColorBackground} 25%, transparent 25%) 0 0/ 148px 148px,
      linear-gradient(45deg, ${secondaryColorBackground}80 25%, ${primaryColorBackground} 25%) 0 0/ 148px 148px`,
    backgroundColor: primaryColorBackground,
  };

  return (
    <div className={styles.appLayout} style={gradientStyle}>
      <header>
        <HamburguerMenu menuBackground={menuColor} />
        <div className={styles.pageHeader}>
          <div className={styles.headerTitle}>
            {pageTitle !== "Painel" ? (
              <span onClick={() => navigate(-1)} className={styles.icon}>
                <FaArrowLeft />
              </span>
            ) : null}
            <h1>{pageTitle}</h1>
          </div>
          {pageSubtitle ? <small>{pageSubtitle}</small> : null}
        </div>
      </header>
      <main>
        {imageDescription ? (
          <div className={styles.imageLayout}>
            <img src={imageLayout} alt={imageDescription} />
          </div>
        ) : null}
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
