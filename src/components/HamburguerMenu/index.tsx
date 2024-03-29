import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

interface MenuItem {
  name: string;
  icon: string;
  path: string;
}

interface HamburguerMenuProps {
  menuBackground?: string;
}

const menuItems: MenuItem[] = [
  {
    name: "Início",
    icon: "fa-home",
    path: "/",
  },
  {
    name: "Água",
    icon: "fa-tint",
    path: "/consumo-agua",
  },
  {
    name: "Energia",
    icon: "fa-bolt",
    path: "/consumo-energia",
  },
  {
    name: "Relatórios",
    icon: "fa-pie-chart",
    path: "/relatorios",
  },
  {
    name: "Configurações",
    icon: "fa-gear",
    path: "/configuracoes",
  },
  // {
  //   name: "Conta",
  //   icon: "fa-user",
  //   path: "/login",
  // },
];

const HamburguerMenu: React.FC<HamburguerMenuProps> = ({
  menuBackground = "#096285da",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const currentYear = new Date().getFullYear();

  const getUserData = () => {
    const name = localStorage.getItem("userName") || "";
    const email = localStorage.getItem("userEmail") || "";

    if (name && email) {
      setUserData({ name, email });
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div
        className={`${styles.menuBtn} ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.menuBtnBurguer}></div>
      </div>

      <section
        className={`${styles.content}`}
        style={{
          display: isOpen ? "flex" : "none",
          background: menuBackground,
        }}
      >
        <div>
          <div
            onClick={() => setIsOpen(false)}
            tabIndex={0}
            className={styles.closeBtn}
          >
            <IoCloseOutline />
          </div>
          <div className={styles.userInfo}>
            <h3>Meu Consumo</h3>
            <div className={styles.userInfoContent}>
              {userData ? (
                <div>
                  <p>{userData.name}</p>
                  <span>{userData.email}</span>
                </div>
              ) : (
                <div className={styles.loginInfo}>
                  <Link to={"/login"}>Entrar</Link>
                  <span> ou </span>
                  <Link to={"/cadastrar"}>Criar conta</Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path}>
                <i
                  className={`fa ${item.icon}`}
                  style={{
                    marginRight:
                      item.icon === "fa-pie-chart" ? "0.75rem" : "1.125rem",
                  }}
                ></i>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <footer className={styles.footer}>
          <p>&copy; Meu Consumo - {currentYear}</p>
          <p>Todos os direitos reservados.</p>
        </footer>
      </section>
    </>
  );
};

export default HamburguerMenu;
