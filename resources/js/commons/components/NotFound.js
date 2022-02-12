import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const NotFound = () => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t('commons.error_404');
  }, []);

  return (
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center ">404</h1>
              </div>

              <div className="contant_box_404">
                <h3 className="h2">
                  { t('commons.warning_404') }
                </h3>

                <Link to="/" className="link_404">
                  { t('commons.go_home') }
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotFound;