import {
    gql,
    graphql
} from 'react-apollo';
import AddNews from './AddNews';

const addnewsMutation = gql`
  mutation addNews($url: String!) {
      addNews(url: $url) {
        id
        url
        title
      }
    }
`;

const AddNewsConnector = graphql(addnewsMutation)(AddNews);

export default AddNewsConnector;