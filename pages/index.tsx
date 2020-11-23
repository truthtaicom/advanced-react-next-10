import { useQuery } from '@apollo/client';
import { withTranslation} from '../i18n'
import Layout from '../components/Layout'
import { GET_PRODUCTS } from '../graphql/product.query';
import withApollo from '../utils/withApollo'
import List from '../components/List';

const IndexPage = ({ t }) => {
  const { data, loading } = useQuery(GET_PRODUCTS, {
    variables: {
      page: 1,
      pageSize: 20,
      order_type: '01'
    }
  });

  if(!data) {
    return null
  }

  const products = data.getProductByConditions?.Products
  console.log(products)

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      {t('supply')}

      <List items={products} />
    </Layout>
  )
}

IndexPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'header', 'footer', 'productCard', 'productBadge']
});

const AppX = withTranslation('common')(IndexPage)

export default withApollo({ ssr: true })(AppX)