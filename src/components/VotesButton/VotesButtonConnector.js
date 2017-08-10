import {
    gql,
    graphql,
    compose
} from 'react-apollo';
import VotesButton from './VotesButton';

const upMutation = gql`
  mutation upvoteNews($newsId: ID!) {
      upvoteNews(newsId: $newsId) {
        id
        url
        title
        votes
      }
  }
`;

const downMutation = gql`
  mutation downvoteNews($newsId: ID!) {
      downvoteNews(newsId: $newsId) {
        id
        url
        title
        votes
      }
  }
`;

export default compose(
    graphql(upMutation, { name: 'upMutation' }),
    graphql(downMutation, { name: 'downMutation' })
)(VotesButton);