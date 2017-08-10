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

const newsSubscription = gql`
  subscription {
    newsAdded {
      id
      title
      url
      votes
    }
  }
`;

const NewsListConnector = graphql(newsListQuery, {
    props: props => {
        return {
            subscribeToNewNews: params => {
                return props.data.subscribeToMore({
                    document: newsSubscription,
                    updateQuery: (prev, {subscriptionData}) => {
                        if (!subscriptionData.data) {
                            return prev;
                        }
                        const newNews = subscriptionData.data.newsAdded;
                        return Object.assign({}, prev, {
                            news: [newNews, ...prev.news]
                        });
                    }
                });
            },
            data: props.data
        };
    },
})(NewsList);

export default NewsListConnector;