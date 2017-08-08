import {
    gql,
    graphql
} from 'react-apollo';
import NewsList from './NewsList';

const newsListQuery = gql`
   query {
     news {
       id
       title
       url
       votes
     }
   }
 `;
const NewsListConnector = graphql(newsListQuery)(NewsList);

export default NewsListConnector;