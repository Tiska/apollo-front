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

function compareNombres(a, b) {
    return b.votes - a.votes;
}

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
                        let news = [newNews, ...prev.news];
                        news.sort(compareNombres);
                        return Object.assign({}, prev, {
                            news: news
                        });
                    }
                });
            },
            data: props.data,
            compareNombres: compareNombres
        };
    },
})(NewsList);

export default NewsListConnector;