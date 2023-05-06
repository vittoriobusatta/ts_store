import React, { useState, useEffect } from 'react';

function Footer(): JSX.Element {
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentYear: number = new Date().getFullYear();
      if (year !== currentYear) {
        setYear(currentYear);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [year]);

  return (
    <footer>
      <div>
        <p>© {year} - Ouhkty Shop | Tous droits réservés</p>
        <p>
          Réalisation par <a href="https://www.vittoriobusatta.fr/">Vittorio</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
