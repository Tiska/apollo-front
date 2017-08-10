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

const newsAddedSubscription = gql`
  subscription {
    newsAdded {
      id
      title
      url
      votes
    }
  }
`;

const newsVotedRequest = gql`
  subscription {
    newsVoted {
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
                return [
                    props.data.subscribeToMore({
                        document: newsAddedSubscription,
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
                    }),
                    props.data.subscribeToMore({
                        document: newsVotedRequest,
                        updateQuery: (prev, {subscriptionData}) => {
                            if (!subscriptionData.data) {
                                return prev;
                            }
                            const newEditedId = subscriptionData.data.newsVoted;
                            let news = [...prev.news];
                            let index = news.findIndex(x => x.id === newEditedId.id);
                            news[index] = newEditedId;
                            news.sort(compareNombres);
                            return Object.assign({}, prev, {
                                news: news
                            });
                        }
                    })
                ]
            },
            data: props.data,
            compareNombres: compareNombres
        };
    },
})(NewsList);

export default NewsListConnector;