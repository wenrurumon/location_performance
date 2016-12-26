
rm(list=ls())

###########################
# macro
###########################

setak <- function(ak = 'CahOhKj71xM6v5LOgGhprnEHgGMowHHt'){
  ak <<- ak
}

setquery <- function(q = 'http://api.map.baidu.com/place/search?'){
  query <<- q
}

list2query <- function(x){
  paste(paste0('&',names(x),'=',unlist(x)),collapse='')
}

getquery <- function(input){
  paste0(query,list2query(input),'&ak=',ak)
}

getjson <- function(input){
  connectStr <- getquery(input)
  con <- url(connectStr)
  data.json <-  RJSONIO::fromJSON(paste(readLines(con), collapse=""),encoding = "UTF-8")
  close(con)
  
  data.json$results <- lapply(data.json$results,unlist)
  key <- unique(unlist(lapply(data.json$results,names)))
  data.json$results <- t(sapply(data.json$results,function(x){
    x[match(key,names(x))]
  }))
  
  data.json$results
  
}

###########################
# Test
###########################

input <- list(query='来福士',region='上海',level='门',output='json')
setquery();setak()
getjson(input)

