.PHONY: build-vendor
build-vendor:
	@rm -rf tmp
	@mkdir -p tmp/googleapis
	@cd tmp/googleapis && \
		git init && \
		git remote add origin git@github.com:googleapis/googleapis.git && \
		git fetch origin 47947b2fb9bdde9b02a7dd173a5077a1cc2beb25 && \
		git checkout FETCH_HEAD && \
		cd ../..
	@rm -rf vendor
	@mkdir vendor
	@protoc \
	  --js_out=import_style=commonjs,binary:vendor \
		-I tmp/googleapis \
		tmp/googleapis/google/api/http.proto tmp/googleapis/google/api/annotations.proto
	@rm -rf tmp
