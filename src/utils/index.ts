import postConfig from "../../posts/posts.json";

function getPostsConfig(postsConfig = "posts.json") {
  return postConfig;
}

export { getPostsConfig };
